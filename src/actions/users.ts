"use server";

import { getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import prisma from "@/lib/prisma";
import { addUserSchema, updateUserSchema } from "@/schemas/user";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUserById,
  updateAdminUser,
} from "@/utils/users";

export type UserActionState = {
  error?: string;
} | null;

function parseUserForm(formData: FormData) {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
  };
}

export async function createUserAction(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const parsed = addUserSchema.safeParse(parseUserForm(formData));
  if (!parsed.success) {
    return { error: "Please check the user details and try again" };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email is already registered" };
  }

  try {
    await createAdminUser({ name, email, password });
  } catch {
    return { error: "Could not create user" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/users", locale });
  return null;
}

export async function updateUserAction(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const userId = String(formData.get("userId") ?? "");
  if (!userId) {
    return { error: "User not found" };
  }

  const parsed = updateUserSchema.safeParse(parseUserForm(formData));
  if (!parsed.success) {
    return { error: "Please check the user details and try again" };
  }

  const user = await getAdminUserById(userId);
  if (!user) {
    return { error: "User not found" };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== userId) {
    return { error: "Email is already registered" };
  }

  try {
    await updateAdminUser(userId, { name, email, password });
  } catch {
    return { error: "Could not update user" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/users", locale });
  return null;
}

export async function deleteUserAction(
  _prev: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const userId = String(formData.get("userId") ?? "");
  if (!userId) {
    return { error: "User not found" };
  }

  const session = await auth();
  const result = await deleteAdminUser(userId, session?.user?.id);

  if (!result.ok) {
    return { error: result.error };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/users", locale });
  return null;
}
