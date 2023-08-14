// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import { player, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  player?: player;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.player_name || typeof req.query.player_name === 'object') {
    res.status(500).json({ message: `Invalid name: ${req.query.player_name}` });
    return;
  }

  try {
    const player = await prisma.player.findUniqueOrThrow({
      where: { name: req.query.player_name }
    });
    res.status(200).json({ player: player });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: `Couldn't get user information for name: ${req.query.player_name}`
    });
  }
}
