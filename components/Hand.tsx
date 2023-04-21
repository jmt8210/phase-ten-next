import { useState } from 'react';
import { PlayingCard } from './PlayingCard';

import styles from '@/styles/Hand.module.sass';

type HandProps = {
  cards: PlayingCard[];
};

export const Hand = ({ cards }: HandProps) => {
  const [cardHovered, setCardHovered] = useState<boolean>(false);
  return (
    <div className={styles.hand}>
      {cards.map((i) => (
        <div key={i.color + i.value} className={styles.hand_card}>
          <PlayingCard value={i.value} color={i.color} size={i.size} />
        </div>
      ))}
    </div>
  );
};
