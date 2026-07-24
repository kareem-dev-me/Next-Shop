"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { auth, unstable_update } from "@/auth";
import prisma from "@/lib/prisma";
import { updateProfileSchema } from "@/schemas/profile";
import { getProfileUser, updateProfile } from "@/utils/profile";

export type ProfileActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function updateProfileAction(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { error: "You must be signed in" };
  }

  const parsed = updateProfileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
  });

  if (!parsed.success) {
    return { error: "Please check your details and try again" };
  }

  const current = await getProfileUser(userId);
  if (!current) {
    return { error: "Account not found" };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== userId) {
    return { error: "Email is already registered" };
  }

  try {
    const updated = await updateProfile(userId, {
      name,
      email,
      password,
    });

    await unstable_update({
      user: {
        name: updated.name,
        email: updated.email,
      },
    });
  } catch {
    return { error: "Could not update profile" };
  }

  const locale = await getLocale();
  revalidatePath(`/${locale}/profile`);
  return { success: true };
}
