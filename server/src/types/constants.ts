export type Payload = {
  id: string;
  role?: "admin" | "user";
};

export type Source = "body" | "params" | "query";
