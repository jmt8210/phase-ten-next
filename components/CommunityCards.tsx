import clsx from 'clsx';
import { CardNumber, PlayingCard } from './PlayingCard';
import { KeyedMutator } from 'swr';
import { game } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

type CommunityCardsProps = {
  player_id: string;
  game_id: number;
  card: CardNumber;
  pickedUp: boolean;
  setPickedUp: Dispatch<SetStateAction<boolean>>;
  mutate: KeyedMutator<{
    message?: string | undefined;
    game: game;
  }>;
};

const takeFromDeck = async (
  player_id: string,
  game_id: number,
  mutate: KeyedMutator<{
    message?: string | undefined;
    game: game;
  }>,
  setPickedUp: Dispatch<SetStateAction<boolean>>
) => {
  await fetch(
    `/api/take_card?game_id=${game_id}&player_id=${player_id}&deck=true`
  )
    .then(() => {
      mutate();
      setPickedUp(true);
    })
    .catch((err) => console.error(err));
};

const takeFromDiscard = async (
  player_id: string,
  game_id: number,
  mutate: KeyedMutator<{
    message?: string | undefined;
    game: game;
  }>,
  setPickedUp: Dispatch<SetStateAction<boolean>>
) => {
  await fetch(
    `/api/take_card?game_id=${game_id}&player_id=${player_id}&deck=false`
  )
    .then(() => {
      mutate();
      setPickedUp(true);
    })
    .catch((err) => console.error(err));
};

export const CommunityCards = ({
  card,
  pickedUp,
  setPickedUp,
  player_id,
  game_id,
  mutate
}: CommunityCardsProps) => (
  <div className={clsx('flex gap-2', !pickedUp && 'animate-pulse')}>
    <a
      onClick={() =>
        !pickedUp
          ? takeFromDeck(player_id, game_id, mutate, setPickedUp)
          : () => {}
      }
    >
      <PlayingCard cardNumber={0} />
    </a>
    {card !== -1 ? (
      <a
        onClick={() =>
          !pickedUp
            ? takeFromDiscard(player_id, game_id, mutate, setPickedUp)
            : () => {}
        }
      >
        <PlayingCard cardNumber={card} />
      </a>
    ) : (
      <></>
    )}
  </div>
);
