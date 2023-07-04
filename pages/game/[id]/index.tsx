import { Hand } from '@/components/Hand';
import { getSession } from 'next-auth/react';
import { Page } from '@/components/Page';

import useSwr from 'swr';
import { game, player_game_info } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function Game({
  session
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const game_id = router.query.id;
  const player_id = session?.user?.name;

  const { data: game_data } = useSwr<{ message?: string; game: game }>(
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
  }, []);

  if (!game_data?.game || !player_game_data?.player_game_info) {
    return (
      <div className="flex justify-center">
        <div className="bg-slate-300 animate-pulse w-full h-96 dialog"></div>
      </div>
    );
  }

  return (
    <Page>
      <h1>Game</h1>
      <Hand cards={game_data.game.deck} />
      <Hand cards={player_game_data?.player_game_info.hand} />
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return { props: { session } };
};
