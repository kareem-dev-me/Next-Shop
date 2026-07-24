import { z } from "zod";

const optionalText = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().min(1).optional(),
);

export const addressSchema = z.object({
  line1: z.string().min(1),
  line2: optionalText,
  city: z.string().min(1),
  state: optionalText,
  postalCode: z.string().min(1),
  country: z.string().min(1),
  isDefault: z.preprocess(
    (value) => value === "on" || value === true || value === "true",
    z.boolean(),
  ),
});

export type AddressInput = z.infer<typeof addressSchema>;
