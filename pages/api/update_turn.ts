// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.game_id || typeof req.query.game_id !== 'string') {
    res.status(500).json({ message: `Invalid game id: ${req.query.game_id}` });
    return;
  }

  const game_id = parseInt(req.query.game_id);

  if (!game_id) {
    res
      .status(500)
      .json({ message: `Couldn't parse game id: ${req.query.game_id}` });
    return;
  }

  const discard = parseInt(req.query.discard as string);
  if (!discard) {
    // TODO: A card may not be discarded if a player puts down their last card (should we disallow this and always discard the last card?)
    res
      .status(500)
      .json({ message: `Couldn't parse card: ${req.query.discard}` });
    return;
  }

  try {
    const game = await prisma.game.findUniqueOrThrow({
      where: {
        id: game_id
      }
    });

    let player_game_info = await prisma.player_game_info.findUniqueOrThrow({
      where: {
        game_id_player_id: {
          player_id: game.player_turn_id,
          game_id: game.id
        }
      }
    });

    await prisma.player_game_info.update({
      where: {
        game_id_player_id: {
          player_id: game.player_turn_id,
          game_id: game.id
        }
      },
      data: {
        hand: player_game_info.hand.filter((i) => i != discard),
        taken_card: false
      }
    });

    // Next player
    player_game_info = await prisma.player_game_info.findUniqueOrThrow({
      where: {
        game_id_player_id: {
          game_id: game_id,
          player_id:
            game.player_ids.indexOf(game.player_turn_id) + 1 ===
            game.player_ids.length
              ? game.player_ids[0]
              : game.player_ids[
                  game.player_ids.indexOf(game.player_turn_id) + 1
                ]
        }
      }
    });

    // Loop through players while skipped
    while (player_game_info.skips !== 0) {
      await prisma.player_game_info.update({
        where: {
          game_id_player_id: {
            game_id,
            player_id: player_game_info.player_id
          }
        },
        data: {
          skips: player_game_info.skips - 1
        }
      });
      player_game_info = await prisma.player_game_info.findUniqueOrThrow({
        where: {
          game_id_player_id: {
            game_id: game_id,
            player_id:
              game.player_ids.indexOf(game.player_turn_id) + 1 ===
              game.player_ids.length
                ? game.player_ids[0]
                : game.player_ids.indexOf(game.player_turn_id) + 1
          }
        }
      });
    }

    await prisma.game.update({
      where: {
        id: game_id
      },
      data: {
        player_turn_id: player_game_info.player_id,
        discard: discard !== -1 ? [discard].concat(game.discard) : game.discard
      }
    });
    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `Unable to get game ${game_id}` });
  }

  return;
}
