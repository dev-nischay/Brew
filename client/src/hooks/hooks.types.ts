export type ApiResponse = {
  message: string;
  status: boolean;
  products?: {};
  token?: string;
  purchases?: {};
};

export type RequestMethod = "POST" | "PUT" | "GET" | "DELETE";

export type Extras = {
  requireAuth?: boolean;
  additionalHeader?: Record<string, string>;
};
