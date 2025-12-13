import type { Product } from "../components/home/home.types";

export type AuthStore = {
  token: string;
  username: string;
  setToken?: (token: string) => void;
  setUsername?: (username: string) => void;
  logout?: () => void;
};

export type CartStore = {
  counter: number;
  cart: Product[];
  addToCart: (product: any) => void;
  // fix the image property to add type here
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

export type PurchaseStore = {
  purchases: Product[];
  totalAmount: number;
  setPurchases?: (purchasesArr: Product[], totalAmount: number) => void;
};
