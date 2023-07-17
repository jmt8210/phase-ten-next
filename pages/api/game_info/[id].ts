// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma/prisma';
import { game } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  game?: game;
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

  if (!id) {
    res.status(500).json({ message: `Couldn't get id: ${id}` });
    return;
  }

  try {
    const game = await prisma.game.findUniqueOrThrow({
      where: { id: id }
    });
    res.status(200).json({ game: game });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: `Couldn't get user information for id: ${id}` });
  }
  return;
}
