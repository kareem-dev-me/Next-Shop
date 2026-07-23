import { z } from "zod";
import { slugSchema } from "./common";

export const addProductSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  categoryId: z.string().min(1),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  description: z.string().optional(),
  image: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().url().optional(),
  ),
});

export const updateProductSchema = addProductSchema;

export type AddProductInput = z.infer<typeof addProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
