// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, game, player, player_game_info } from '@prisma/client';
import { initGame, shuffle } from './util';

type Data = { game_id: number } | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const data = JSON.parse(req.body);
  var player_names = data.player_names;
  player_names.push(data.player);
  player_names = [...new Set<String>(player_names)]; // Remove duplicates
  let players: player[] = [];
  for (let name of player_names) {
    let player = await prisma.player.findFirst({
      where: { name: { equals: name } }
    });
    if (player == null) {
      res.status(404).send({ message: `Username ${name} not found` });
      return;
    }
    players.push(player);
  }
  var userIDs = [];
  for (let player of players) {
    userIDs.push(player?.id);
  }
  shuffle(userIDs);

  var game = initGame(userIDs);

  var createdGame;
  try {
    const tempGame: Omit<game, 'id'> = {
      player_ids: userIDs,
      deck: game.deck,
      player_turn_id: userIDs[0],
      dealer_id: userIDs[0],
      discard: game.discard,
      winner_id: null
    };
    createdGame = await prisma.game.create({
      data: {
        ...tempGame,
        deck: game.deck,
        discard: game.discard
      }
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: 'Unable to create game' });
    return;
  }

  for (var player of players) {
    const userData: player_game_info = {
      skips: 0,
      hand: game.player_hands[player.id],
      phase: 1,
      score: 0,
      game_id: createdGame.id,
      player_id: player.id,
      laid_cards: [],
      taken_card: false
    };

    await prisma.player_game_info.create({
      data: userData
    });
  }
  res.status(200).json({ game_id: createdGame.id });
  return;
}
