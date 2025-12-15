import { z } from "zod";

const passwordSchema = z
  .string("Username must be at least 8 characters long")
  .min(8, "Password must be at least 8 characters long")
  .max(24, "Password cannot be more than 24 characters")
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must include uppercase, lowercase, number, and special character."
  );

export const signupSchema = z
  .object({
    username: z.string().min(8).max(16),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type createBody = z.infer<typeof signupSchema>;
export type loginBody = z.infer<typeof signinSchema>;
