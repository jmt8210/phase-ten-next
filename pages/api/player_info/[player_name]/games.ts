// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  game_ids?: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.player_name || typeof req.query.player_name !== 'string') {
    res.status(500).json({ message: `Invalid id: ${req.query.id}` });
    return;
  }

  const player = await prisma.player.findUniqueOrThrow({
    where: {
      name: req.query.player_name
    }
  });

  if (!player) {
    res
      .status(500)
      .json({ message: `Couldn't get player: ${req.query.player_name}` });
    return;
  }

  try {
    const games = await prisma.game.findMany({
      where: { player_ids: { has: player.id } }
    });
    const game_ids: number[] = games.map((i) => i.id);
    res.status(200).json({ game_ids });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: `Couldn't get games for id: ${player.id}` });
  }
  return;
}
