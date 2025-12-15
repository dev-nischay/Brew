import type { SetStateAction, Dispatch } from "react";

type InputProps = {
  text: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  error: string | undefined;
};

export const AuthInput = ({ text, state, setState, error }: InputProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={text}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="border w-72 rounded p-2 outline-background    placeholder:text-background"
      />
      <div className="absolute right-2 -bottom-8 text-red-500 ">{error}</div>
    </div>
  );
};
