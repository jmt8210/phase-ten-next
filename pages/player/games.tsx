import { Hand } from '@/components/Hand';
import { Page } from '@/components/Page';
import { game, player_game_info } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { globalArrayFetcher } from '../_app';

export default function PlayerGames() {
  const { data: session } = useSession();
  const { data: user_data } = useSWR(
    session?.user?.name
      ? `/api/player_info/${session?.user?.name}/games`
      : undefined
  );
  const { data: player_game_datas } = useSWR(
    user_data && user_data.game_ids
      ? user_data.game_ids.map(
          (i: number) => `/api/player_game_info/${session?.user?.name}/${i}`
        )
      : '',
    globalArrayFetcher
  );
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (!session) router.push('/login');
    }, 1000);
  }, [session, router]);

  const handleRowClick = (game_id: number) => {
    router.push(`/game/${game_id}`);
  };

  if (!session || !user_data || !player_game_datas) {
    return (
      <Page>
        <div className="flex justify-center">
          <div className="bg-slate-300 animate-pulse w-full h-96 dialog"></div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="w-3/4 border rounded-lg overflow-hidden">
        <table className="table w-full">
          <thead className="bg-gray-700">
            <tr>
              <th>Id</th>
              <th>Phase</th>
              <th>Score</th>
              <th>Hand</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer text-center divide-y-2 divide-gray-50">
            {player_game_datas.map(
              (res: { player_game_info: player_game_info }) => (
                <tr
                  key={res.player_game_info.game_id}
                  onClick={() => handleRowClick(res.player_game_info.game_id)}
                  className="bg-gray-600"
                >
                  <td>{res.player_game_info.game_id}</td>
                  <td>{res.player_game_info.phase}</td>
                  <td>{res.player_game_info.score}</td>
                  <td className="flex justify-center">
                    <Hand cards={res.player_game_info.hand} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: JSON.parse(JSON.stringify(getSession(context)))
    }
  };
};
