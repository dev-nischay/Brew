import { useNavigate } from "react-router-dom";
import type { CartProps } from "./share.types";
export const Cart = ({ count = 0 }: CartProps) => {
  const nav = useNavigate();
  const display = count > 99 ? "99+" : String(count);
  return (
    <button
      onClick={() => nav("/home/payments")}
      aria-label="Open cart"
      className="h-8 w-8  bg-background relative rounded-md flex items-center justify-center p-[0.4rem]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-foreground"
        role="img"
        aria-hidden="false"
      >
        <title>Shopping cart</title>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span
        className={`absolute -top-2 -right-2 min-w-[1.2rem] h-5 rounded-full bg-gradient-to-r from-red-400 to-pink-600 text-white text-xs font-semibold flex items-center justify-center px-1  ${
          count > 0 ? "animate-bounce" : "animate-pulse"
        } `}
      >
        {display}
      </span>
    </button>
  );
};
