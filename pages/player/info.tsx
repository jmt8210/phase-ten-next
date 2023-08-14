import { Page } from '@/components/Page';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession, useSession } from 'next-auth/react';

export default function PlayerInfo() {
  const { data: session } = useSession();
  if (!session || !session.user) {
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
      <h1>Player Info</h1>
      <p>Username: {session.user.name}</p>
    </Page>
  );
}
