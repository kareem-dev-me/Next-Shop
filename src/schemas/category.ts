import { z } from "zod";
import { slugSchema } from "./common";

export const addCategorySchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().optional(),
});

export const updateCategorySchema = addCategorySchema;

export type AddCategoryInput = z.infer<typeof addCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
