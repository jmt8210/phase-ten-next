import Link from 'next/link';

export const Header = () => {
  return (
    <div className="sticky flex w-screen h-6 mb-5 justify-around items-center bg-gradient">
      <b>Phase 10</b>
      <div style={{ float: 'right' }}>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};
