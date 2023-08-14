import Link from 'next/link';
import { useSession } from 'next-auth/react';

export const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky flex w-screen h-6 mb-5 justify-around items-center bg-gradient">
      <Link href="/">Phase 10</Link>
      {session && session.user && session.user !== null ? (
        <>
          <Link href="/player/games">Games</Link>
          <Link href="/player/info">Info</Link>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};
