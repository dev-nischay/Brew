import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PurchaseStore } from "./store.types";

export const purchaseStore = create(
  persist<PurchaseStore>(
    (set) => ({
      purchases: [],
      totalAmount: 0,
      setProducts: (purchasesArr) => set({ purchases: purchasesArr }),
    }),
    {
      name: "purchases",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        purchases: state.purchases,
        totalAmount: state.totalAmount,
      }),
    }
  )
);
