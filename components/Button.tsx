type ButtonProps = {
  children: React.ReactNode;
};
export const Button = ({ children }: ButtonProps) => (
  <button className="rounded py-1 px-3 hover:cursor-pointer bg-card-blue">
    {children}
  </button>
);
