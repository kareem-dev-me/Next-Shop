import { z } from "zod";
import { emailSchema } from "./common";

export const checkoutSchema = z.object({
  email: emailSchema,
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || value.length >= 7, {
      message: "Phone must be at least 7 characters",
    }),
  fullName: z.string().min(1),
  line1: z.string().min(1),
  city: z.string().min(1),
  postal: z.string().min(1),
  country: z.string().min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
