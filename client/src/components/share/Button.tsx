import type { ButtonProps } from "./share.types";

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={`px-14 rounded-3xl py-2 bg-coffee-dark  hover:bg-[#38220f]/60 transition-all duration-100 flex justify-center tracking-wider ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
