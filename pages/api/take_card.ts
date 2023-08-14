// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const data = req.query;

  if (typeof data.game_id !== 'string' || typeof data.player_id !== 'string') {
    res.status(500).json({});
    return;
  }
  const game_id = parseInt(data.game_id);
  const game = await prisma.game.findFirst({ where: { id: game_id } });
  const player = await prisma.player.findFirst({
    where: { name: data.player_id }
  });
  if (!game || !player) {
    res.status(500).json({});
    return;
  }
  const player_game_info = await prisma.player_game_info.findFirst({
    where: { game_id: game_id, player_id: player.id }
  });
  if (!player_game_info) {
    res.status(500).json({});
    return;
  }

  let newCard = game.discard[0];
  if (data.deck === 'true') newCard = game.deck[0];

  await prisma.player_game_info.update({
    where: { game_id_player_id: { game_id, player_id: player.id } },
    data: { hand: [...player_game_info.hand, newCard], taken_card: true }
  });

  if (data.deck === 'true') {
    await prisma.game.update({
      where: { id: game_id },
      data: {
        deck: game.deck.slice(1, game.deck.length)
      }
    });
  } else {
    await prisma.game.update({
      where: { id: game_id },
      data: {
        discard:
          game.discard.length > 1
            ? game.discard.slice(1, game.discard.length)
            : []
      }
    });
  }
  res.status(200).json({});
  return;
}
