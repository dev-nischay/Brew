import type { Product } from "../components/home/home.types";

export type ApiResponse = {
  message?: string;
  error?: string;
  status: boolean;
  products?: Product[];
  token?: string;
  purchases?: {};
};

export type RequestMethod = "POST" | "PUT" | "GET" | "DELETE";

export type Extras = {
  requireAuth?: boolean;
  additionalHeader?: Record<string, string>;
};
