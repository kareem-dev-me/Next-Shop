import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

export const updateProfileSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    passwordSchema.optional(),
  ),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
