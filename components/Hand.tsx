import { PlayingCard } from './PlayingCard';

type HandProps = {
  cards: PlayingCard[];
};

export const Hand = ({ cards }: HandProps) => {
  return (
    <div>
      {cards.map((i) => (
        <div
          key={i.color + i.value}
          className="w-fit float-left transition-transform hover:-translate-y-5 ml-1"
        >
          <PlayingCard value={i.value} color={i.color} size={i.size} />
        </div>
      ))}
    </div>
  );
};
