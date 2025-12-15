import type { HTMLProps } from "react";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  className?: HTMLProps<HTMLElement>["className"];
};

export type CartProps = {
  count?: number;
};
