import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PurchaseStore } from "./store.types";

export const usePurchaseStore = create(
  persist<PurchaseStore>(
    (set) => ({
      purchases: [],
      totalAmount: 0,
      setPurchases: (purchasesArr,totalAmount) => set({ purchases: purchasesArr ,totalAmount}),
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
