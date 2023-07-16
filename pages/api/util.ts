import { CardValue } from '@/components/PlayingCard';

export function shuffle(list: Array<any>) {
  list.sort(() => Math.random() - 0.5);
}

type GameData = {
  deck: number[];
  discard: number[];
  player_hands: Record<string, number[]>;
  scores: number[];
  phases: number[];
  skips: number[];
};
export const initGame: (playerIDs: number[]) => GameData = (
  playerIDs: number[]
) => {
  var newDeck: number[] = [];

  // Color: 1 - 12, twice
  // Wilds: 8
  // Skips: 4
  // Total: ( (Color * 4 * 2) + Wilds + Skips) = 96 + 8 + 4 = 108
  for (let i = 1; i <= 108; i++) newDeck.push(i as CardValue);

  shuffle(newDeck);

  var hands: Record<string, number[]> = {};
  for (var player of playerIDs) {
    hands[player] = [];
    for (var i = 0; i < 10; i++) {
      let card = newDeck.shift();
      if (card) hands[player].push(card);
    }
  }

  var scoresArr = Array(playerIDs.length).fill(0);
  var phaseArr = Array(playerIDs.length).fill(1);
  var skipArr = Array(playerIDs.length).fill(1);
  var firstCard = newDeck.shift();
  var newDiscard = firstCard ? [firstCard] : [];

  var game_data = {
    deck: newDeck,
    discard: newDiscard,
    player_hands: hands,
    scores: scoresArr,
    phases: phaseArr,
    skips: skipArr
  };

  return game_data;
};
