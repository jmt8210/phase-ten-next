import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type Data = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  if (!body.username || !body.password) {
    res.status(500).json({ message: 'Username/password not provided' });
    return;
  }

  const prisma = new PrismaClient();

  try {
    await prisma.player.create({
      data: {
        name: body.username,
        password: body.password
      }
    });
  } catch (e) {
    res.status(500).json({ message: 'Could not create player' });
  }

  res.status(200);
}
