import { z } from "zod";
import { isEmpty } from "../utils/checkEmpty.js";

export const createProductSchema = z.object({
  productName: z
    .string("Product name is required")
    .min(3, { message: "Product name must be at least 3 characters long" })
    .max(64, { message: "Product name cannot exceed 64 characters" }),

  description: z
    .string("Description is required")
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(300, { message: "Description cannot exceed 300 characters" }),

  price: z
    .number("Price is required")
    .positive({ message: "Price must be positive" })

    .gt(0, { message: "Price must be greater than 0" }),

  images: z
    .array(
      z.object({
        url: z.url("Invalid Url "),
      })
    )
    .min(1, { message: "At least one product image is required" }),
});

export const updateProductSchema = z
  .object({
    productName: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    images: z.url().optional(),
  })
  .refine((data) => isEmpty(data), {
    error: "Data cannot be empty",
  });

export const productIdSchema = z.object({
  productId: z.string().max(24),
});

export const purchaseProductSchema = z.object({
  totalAmount: z.number().gt(0, { message: "totalAmount cannot be  0" }),
  items: z.array(z.object({ productId: z.string() })),
});

export const reviewProductSchema = z.object({
  review: z.string().min(1).max(900),
});

export type productBody = z.infer<typeof createProductSchema>;
export type paramBody = z.infer<typeof productIdSchema>;
export type productUpdateBody = z.infer<typeof updateProductSchema>;
export type purchaseBody = z.infer<typeof purchaseProductSchema>;
export type reviewBody = z.infer<typeof reviewProductSchema>;
