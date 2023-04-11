import Image from 'next/image';

export type PlayingCard = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  color: 'Blue' | 'Green' | 'Yellow' | 'Red' | 'Skip' | 'Wild';
  size?: 'sm' | 'md' | 'lg' | number;
};

export const PlayingCard = ({ value, color, size }: PlayingCard) => (
  <Image
    width={size === 'sm' ? 16 : size === 'md' ? 32 : 64}
    height={size === 'sm' ? 16 : size === 'md' ? 32 : 64}
    src={`/images/cards/${color}-${value}.svg`}
    alt={`Card: ${color} ${value}`}
  />
);
