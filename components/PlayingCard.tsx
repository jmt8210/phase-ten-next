import Image from 'next/image';

export type CardNumber = number;

export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type CardColor =
  | 'Back'
  | 'Blue'
  | 'Green'
  | 'Yellow'
  | 'Red'
  | 'Wild'
  | 'Skip';
export type CardSize = 'sm' | 'md' | 'lg' | number;

export type PlayingCard = {
  cardNumber: CardNumber;
  size?: CardSize;
};

const parseCardNumber: (cardNumber: CardNumber) => {
  color: CardColor;
  value: CardValue;
} = (cardNumber) => {
  let color: CardColor = 'Skip';
  let value = cardNumber - 1;
  if (value === -1) {
    color = 'Back';
  } else if (value < 24) {
    color = 'Blue';
  } else if (value < 48) {
    color = 'Green';
  } else if (value < 72) {
    color = 'Yellow';
  } else if (value < 96) {
    color = 'Red';
  } else if (value < 104) {
    color = 'Wild';
  }
  value = (value % 12) + 1;
  if (color === 'Skip') value -= 8;
  return { color, value: value as CardValue };
};

const calculateSize: (size: CardSize | undefined) => number = (size) => {
  return typeof size === 'number'
    ? size
    : size === 'sm'
    ? 16
    : size === 'md'
    ? 32
    : 64;
};

export const PlayingCard = ({ cardNumber, size }: PlayingCard) => {
  const { color, value } = parseCardNumber(cardNumber);
  let src = `/images/cards/${color}-${value}.svg`;
  let alt = `Card: ${color} ${value}`;
  if (color === 'Back') {
    src = '/images/cards/Card-Back.svg';
    alt = 'Card Back';
  }
  return (
    <>
      <Image
        // Warning displays when setting width and height
        // https://github.com/vercel/next.js/issues/40762
        width={0}
        height={0}
        src={src}
        alt={alt}
        style={{ width: calculateSize(size), height: 'auto' }}
        priority={true}
      />
    </>
  );
};
