import { Hand } from '@/components/Hand';
import { PlayingCard } from '@/components/PlayingCard';
import { Page } from '@/components/Page';

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
    <Page>
      <h1>Game</h1>
      <Hand cards={cards} />
    </Page>
  );
}
