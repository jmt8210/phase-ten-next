import Head from 'next/head';
import styles from '@/styles/Create.module.sass';
import { Header } from '@/components/Header';
import { Hand } from '@/components/Hand';
import { PlayingCard } from '@/components/PlayingCard';

export default function Game() {
  const cards: PlayingCard[] = [
    {
      value: 1,
      color: 'Green'
    },
    {
      value: 2,
      color: 'Green'
    },
    {
      value: 3,
      color: 'Green'
    },
    {
      value: 4,
      color: 'Green'
    },
    {
      value: 5,
      color: 'Green'
    },
    {
      value: 6,
      color: 'Green'
    },
    {
      value: 7,
      color: 'Green'
    },
    {
      value: 8,
      color: 'Green'
    },
    {
      value: 9,
      color: 'Green'
    },
    {
      value: 10,
      color: 'Green'
    }
  ];
  return (
    <div className={styles.create}>
      <Head>
        <title>Phase 10</title>
        <meta name="description" content="Phase 10 online, for NMM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Logo.svg" />
      </Head>
      <Header />
      <h1>Game</h1>
      <Hand cards={cards} />
    </div>
  );
}
