import { PlayingCard } from './PlayingCard';

type HandProps = {
  cards: number[];
};

export const Hand = ({ cards }: HandProps) => {
  return (
    <div className="flex gap-2">
      {cards.map((i) => (
        <div
          key={i}
          className="w-fit transition-transform hover:-translate-y-5"
        >
          <PlayingCard cardNumber={i} />
        </div>
      ))}
    </div>
  );
};
