declare namespace Express {
  export interface Request {
    token: {
      id: string;
      role?: string;
    };

    validatedBody?: unknown;
    validatedParams?: {
      productId?: string;
    };
    validatedQuery?: unknown;
  }
}
