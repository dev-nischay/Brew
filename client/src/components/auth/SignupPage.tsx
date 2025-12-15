import { AuthInput } from "./input";
import { useFetch } from "../../hooks/useFetch";
import { useState, type FormEvent } from "react";
import type { ApiResponse } from "../../hooks/hooks.types";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const nav = useNavigate();
  const body = {
    username,
    password,
    confirmPassword: confirm,
  };
  const { error, loading, request } = useFetch(
    "signup",
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
    {
      placeholder: "Confirm Password",
      state: confirm,
      setState: setConfirm,
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = (await request()) as ApiResponse;
      console.log(data);
      console.log(data.message);
      if (data.message && data.status == true) {
        nav("signin");
      }
    } catch (error) {}
  };
  return (
    <div className="ml-24">
      <div className="w-[25rem] h-[32rem] bg-background rounded-lg">
        <h1 className="text-foreground text-3xl font-bold flex justify-center p-4">
          Sign up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-12  items-center p-6 ">
            {inputArr.map((e, index) => (
              <div key={index} className="relative">
                <AuthInput
                  text={e.placeholder}
                  state={e.state}
                  setState={e.setState}
                  error={error ? "Invalid Input" : undefined} // fomatted erros will be fixed later
                />
              </div>
            ))}

            <button
              type="submit"
              className="px-10 mr-6 py-2   rounded-md border-2 font-bold text-lg text-foreground hover:border-black hover:text-black transition-all"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
