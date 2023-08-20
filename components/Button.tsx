import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const Button = ({ children, ...props }: ButtonProps) => (
  <button
    {...props}
    className="rounded py-1 px-3 hover:cursor-pointer bg-card-blue"
  >
    {children}
  </button>
);
