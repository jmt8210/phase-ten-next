import { Hand } from '@/components/Hand';
import { Page } from '@/components/Page';

import useSwr from 'swr';
import { game, player_game_info } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CommunityCards } from '@/components/CommunityCards';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/Button';
import { PlayingCard } from '@/components/PlayingCard';
import clsx from 'clsx';

export default function Game() {
  const session = useSession();
  const router = useRouter();
  const [waitedForSession, setWaitedForSession] = useState<boolean>(false);
  // For now, only allow one card to be selected so that it can be discarded
  const [activeCard, setActiveCard] = useState<number>(-1);
  const [pickedUp, setPickedUp] = useState<boolean>(false);
  const player_id = session?.data?.user?.name;
  let game_id = router.query.id;
  let isTurn = false;

  const { data: game_data, mutate } = useSwr<{ message?: string; game: game }>(
    game_id ? `/api/game_info/${game_id}` : null
  );
  const { data: player_game_data, mutate: mutatePlayerInfo } = useSwr<{
    message?: string;
    player_game_info: player_game_info;
  }>(
    game_id && player_id
      ? `/api/player_game_info/${player_id}/${game_id}`
      : null
  );

  const endTurn = async () => {
    await fetch(`/api/update_turn?game_id=${game_id}&discard=${activeCard}`)
      .then(() => {
        setPickedUp(false);
      })
      .catch((err) => console.error(err));
    await mutate();
    await mutatePlayerInfo();
    isTurn =
      game_data?.game.player_turn_id ===
      player_game_data?.player_game_info.player_id;
  };

  useEffect(() => {
    setTimeout(() => {
      if (!session) router.push('/login');
    }, 1000);
  }, [session, router]);

  if (
    !game_data?.game ||
    !player_id ||
    !player_game_data?.player_game_info ||
    typeof game_id !== 'string'
  ) {
    return (
      <div className="flex justify-center">
        <div className="bg-slate-300 animate-pulse w-full h-96 dialog"></div>
      </div>
    );
  } else {
    isTurn =
      game_data.game.player_turn_id ===
      player_game_data.player_game_info.player_id;
  }

  console.log(isTurn);

  return (
    <Page>
      <h1>Game {game_id}</h1>
      <CommunityCards
        isTurn={isTurn}
        playerID={player_id}
        gameID={parseInt(game_id)}
        card={game_data.game.discard[0] ?? -1}
        pickedUp={pickedUp || player_game_data.player_game_info.taken_card}
        mutate={mutate}
        setPickedUp={setPickedUp}
      />
      {/* The hand */}
      <div className="flex gap-2">
        {player_game_data?.player_game_info.hand.map((i) => (
          <div
            key={i}
            className="w-fit transition-transform hover:-translate-y-5"
          >
            <div
              onClick={() => setActiveCard?.(() => (activeCard === i ? -1 : i))}
              className={clsx('active:outline', activeCard === i && 'outline')}
            >
              <PlayingCard cardNumber={i} />
            </div>
          </div>
        ))}
      </div>
      {isTurn && (
        <Button
          disabled={!pickedUp || activeCard == -1}
          onClick={async () => await endTurn()}
        >
          End Turn
        </Button>
      )}
    </Page>
  );
}
