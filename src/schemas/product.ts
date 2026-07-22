import { z } from "zod";
import { slugSchema } from "./common";

export const addProductSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  category: z.string().min(1),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  description: z.string().optional(),
});

export type AddProductInput = z.infer<typeof addProductSchema>;
