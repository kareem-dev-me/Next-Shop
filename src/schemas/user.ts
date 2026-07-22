import { z } from "zod";
import { emailSchema, passwordSchema, roleSchema } from "./common";

export const addUserSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

export type AddUserInput = z.infer<typeof addUserSchema>;
