import Head from 'next/head';
import { Header } from './Header';

type PageProps = {
  children: React.ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <>
      <Head>
        <title>Phase 10</title>
        <meta name="description" content="Phase 10 online, for NMM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Logo.svg" />
      </Head>
      <Header />
      <div className="flex items-center content-center flex-col gap-y-2">
        {children}
      </div>
    </>
  );
};
