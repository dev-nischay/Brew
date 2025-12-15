import { AuthInput } from "./input";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import type { FormEvent } from "react";
import type { ApiResponse } from "../../hooks/hooks.types";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUsername);
  const nav = useNavigate();
  const body = {
    username,
    password,
  };
  const { error, loading, request } = useFetch(
    "signin",
    "POST",
    { requireAuth: false },
    { ...body }
  );

  const inputArr = [
    {
      placeholder: "Enter Username",
      state: username,
      setState: setUsername,
    },
    {
      placeholder: "Enter Password",
      state: password,
      setState: setPassword,
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data: ApiResponse = await request();
      if (loading) console.log("loading....");
      if (data.token !== undefined) {
        setToken!(data.token);
        setUser!(username);
        nav("/products/home");
      }
      console.log(data.message);
      alert(data.message);
    } catch (error) {}
  };
  return (
    <div className="ml-24">
      <div className="w-[25rem] h-[32rem] bg-background rounded-lg">
        <h1 className="text-foreground text-3xl font-bold flex justify-center p-4">
          Sign in
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-12  items-center p-6 ">
            {inputArr.map((e, index) => (
              <div key={index} className="relative">
                <AuthInput
                  text={e.placeholder}
                  state={e.state}
                  setState={e.setState}
                  error={error ? "Invalid Input" : undefined}
                />
                {error instanceof Error && (
                  <div className="absolute right-2 -bottom-8 text-red-500 ">
                    {error?.message}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="px-10 mr-6 py-2   rounded-md border-2 font-bold text-lg text-foreground hover:border-black hover:text-black transition-all disabled:opacity-50"
            >
              Signin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
