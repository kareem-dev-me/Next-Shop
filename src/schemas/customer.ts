import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

export const addCustomerSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: passwordSchema,
});

export const updateCustomerSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    passwordSchema.optional(),
  ),
});

export type AddCustomerInput = z.infer<typeof addCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
