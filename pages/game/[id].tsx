import { Hand } from '@/components/Hand';
import { Page } from '@/components/Page';

import useSwr from 'swr';
import { game, player_game_info } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CommunityCards } from '@/components/CommunityCards';
import { useSession } from 'next-auth/react';

export default function Game() {
  const session = useSession();
  const router = useRouter();
  const [pickedUp, setPickedUp] = useState<boolean>(false);
  const player_id = session?.data?.user?.name;
  let game_id = router.query.id;
  let isTurn = false;

  const { data: game_data, mutate } = useSwr<{ message?: string; game: game }>(
    game_id ? `/api/game_info/${game_id}` : null
  );
  const { data: player_game_data } = useSwr<{
    message?: string;
    player_game_info: player_game_info;
  }>(
    game_id && player_id
      ? `/api/player_game_info/${player_id}/${game_id}`
      : null
  );

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

  return (
    <Page>
      <h1>Game {game_id}</h1>
      <CommunityCards
        player_id={player_id}
        game_id={parseInt(game_id)}
        card={game_data.game.discard[0] ?? -1}
        pickedUp={pickedUp || player_game_data.player_game_info.taken_card}
        mutate={mutate}
        setPickedUp={setPickedUp}
      />
      <Hand cards={player_game_data?.player_game_info.hand} />
    </Page>
  );
}
