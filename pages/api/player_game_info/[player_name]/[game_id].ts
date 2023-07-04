// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { player_game_info, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  player_game_info?: player_game_info;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const player_name = req.query.player_name;
  const game_id = parseInt(
    req.query.game_id && typeof req.query.game_id === 'string'
      ? req.query.game_id
      : '-1'
  );

  if (!player_name || typeof player_name !== 'string') return;
  if (!game_id) return;

  try {
    const prisma = new PrismaClient();
    const player = await prisma.player.findUniqueOrThrow({
      where: {
        name: player_name
      }
    });
    const player_game_info = await prisma.player_game_info.findUniqueOrThrow({
      where: {
        game_id_player_id: {
          player_id: player.id,
          game_id: game_id
        }
      }
    });
    res.status(200).json({ player_game_info: player_game_info });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: `Couldn't get user information for player: ${player_name}`
    });
  }
  return;
}
