import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const adminLoginSchema = loginSchema;

export const signupSchema = z
  .object({
    name: z.string().min(1),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
