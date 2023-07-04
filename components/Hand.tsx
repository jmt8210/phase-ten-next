import { PlayingCard } from './PlayingCard';

type HandProps = {
  cards: number[];
};

export const Hand = ({ cards }: HandProps) => {
  return (
    <div>
      {cards.map((i) => (
        <div
          key={i}
          className="w-fit float-left transition-transform hover:-translate-y-5 ml-1"
        >
          <PlayingCard cardNumber={i} />
        </div>
      ))}
    </div>
  );
};
