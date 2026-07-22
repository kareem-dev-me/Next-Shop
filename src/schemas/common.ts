import { z } from "zod";

export const emailSchema = z.email();

export const passwordSchema = z.string().min(8);

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");

export const roleSchema = z.enum(["USER", "ADMIN"]);
