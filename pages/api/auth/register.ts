import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

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
    const user = await prisma.player.findFirst({
      where: { name: { equals: body.username } }
    });

    if (user) {
      res.status(409).json({ message: 'Player with that name already exists' });
      return;
    }

    bcrypt.hash(body.password, SALT_ROUNDS, async (err, hash) => {
      if (err) console.log(err);
      await prisma.player.create({
        data: {
          name: body.username,
          password: hash
        }
      });
      res.status(200);
      return;
    });
  } catch (e) {
    res.status(500).json({ message: 'Could not create player' });
    return;
  }

  res.status(200);
  return;
}
