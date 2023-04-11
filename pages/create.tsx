import Head from 'next/head';
import styles from '@/styles/Create.module.sass';
import { Header } from '@/components/Header';
import { CreateGameDialog } from '@/components/CreateGameDialog';

export default function Create() {
  return (
    <div className={styles.create}>
      <Head>
        <title>Phase 10</title>
        <meta name="description" content="Phase 10 online, for NMM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Logo.svg" />
      </Head>
      <Header />
      <h1>Create Game</h1>
      <CreateGameDialog />
    </div>
  );
}
