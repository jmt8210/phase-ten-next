import clsx from 'clsx';
import { PlayingCard } from './PlayingCard';

type HandProps = {
  cards: number[];
  canUpdate?: boolean;
};

export const Hand = ({ cards, canUpdate = false }: HandProps) => {
  return (
    <div className="flex gap-2">
      {cards.map((i) => (
        <div
          key={i}
          className={clsx(
            'w-fit',
            canUpdate ? 'transition-transform hover:-translate-y-5' : ''
          )}
        >
          <div className=" active:outline">
            <PlayingCard cardNumber={i} />
          </div>
        </div>
      ))}
    </div>
  );
};
