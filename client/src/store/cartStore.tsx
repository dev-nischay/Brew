import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartStore } from "./store.types";
import type { Product } from "../components/home/home.types";
export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      counter: 0,
      cart: [],
      addToCart: (product: Product) =>
        set((state) => ({
          cart: [...state.cart, product],
          counter: state.counter + 1,
        })),

      removeFromCart: (productId) =>
        set((state) => {
          const updatedArr = state.cart.filter((e) => productId !== e._id);
          return { cart: updatedArr, counter: Math.max(0, updatedArr.length) };
        }),

      clearCart: () => set({ cart: [], counter: 0 }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({ counter: state.counter, cart: state.cart } as any),
    }
  )
);
