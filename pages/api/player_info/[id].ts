// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  if (!req.query.id || typeof req.query.id === 'object') {
    res.status(500).json({ message: `Invalid id: ${req.query.id}` });
    return;
  }

  const id = parseInt(req.query.id);

  try {
    const prisma = new PrismaClient();
    const player = await prisma.player.findUniqueOrThrow({
      where: { id: id }
    });
    res.status(200).json({ player: player });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: `Couldn't get user information for id: ${id}` });
  }
}
