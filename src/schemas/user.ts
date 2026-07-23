import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

export const addUserSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: passwordSchema,
});

export const updateUserSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    passwordSchema.optional(),
  ),
});

export type AddUserInput = z.infer<typeof addUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
