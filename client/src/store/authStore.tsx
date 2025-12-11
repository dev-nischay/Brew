import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  token: string;
  username: string;
  setToken?: (token: string) => void;
  setUsername?: (username: string) => void;
  logout?: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: "",
      username: "",
      setToken: (token) => {
        set({ token });
        localStorage.setItem("Authorization", `Bearer ${token}`);
      },
      setUsername: (username: string) => set(() => ({ username })),
      logout: () => {
        set(() => ({ token: "", username: "" }));
        localStorage.clear();
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, username: state.username }),
      onRehydrateStorage: (state) => {
        if (state?.token) {
          localStorage.setItem("Authorization", `Bearer ${state.token}`);
        }
      },
    }
  )
);
