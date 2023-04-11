import Head from 'next/head';
import styles from '@/styles/Home.module.sass';
import { Header } from '@/components/Header';
import { LoginDialog } from '@/components/LoginDialog';

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Phase 10</title>
        <meta name="description" content="Phase 10 online, for NMM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Logo.svg" />
      </Head>
      <Header />
      <LoginDialog />
    </div>
  );
}
