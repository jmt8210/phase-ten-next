type ButtonProps = {
  children: JSX.Element;
};
export const Button = ({ children }: ButtonProps) => (
  <button>{children}</button>
);
