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
      where: { name: body.username }
    });

    if (user)
      res.status(409).json({ message: 'Player with that name already exists' });

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

// OLD
// var query = {
//   text: 'select * from "user" where username=$1',
//   values: [req.body.username]
// };
// client.query(query, (err, queryRes) => {
//   if (err) console.log(err); // Properly log error
//   if (queryRes.rowCount != 0) {
//     res.status(409).send('Username already taken');
//   } else {
//     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//       if (err) console.log(err); // Properly log error
//       query = {
//         text: 'insert into "user" values ($1, $2)',
//         values: [req.body.username, hash]
//       };
//       client.query(query, (err, innerQueryRes) => {
//         if (err) console.log(err); // Properly log error
//         res.send(genJWT(req.body.username));
//         // console.log("Saved password");
//       });
//     });
//   }
// });
