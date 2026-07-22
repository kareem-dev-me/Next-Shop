import { z } from "zod";
import { slugSchema } from "./common";

export const addCategorySchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().optional(),
});

export type AddCategoryInput = z.infer<typeof addCategorySchema>;
