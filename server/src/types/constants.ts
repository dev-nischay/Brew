export type Payload = {
  id: string;
  role?: "Admin" | "User";
};

export type Source = "body" | "params" | "query";
