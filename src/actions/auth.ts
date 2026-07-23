"use server";

import { AuthError } from "next-auth";
import { getLocale } from "next-intl/server";
import { signIn, signOut } from "@/auth";
import { redirect } from "@/i18n/navigation";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { loginSchema, signupSchema } from "@/schemas/auth";

export type AuthActionState = {
  error?: string;
} | null;

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid email or password" };
  }

  const redirectTo = (formData.get("redirectTo") as string) || "/";
  const href = redirectTo.startsWith("/") ? redirectTo : "/";

  try {
    await signIn("user-signin", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }


  const locale = await getLocale();
  redirect({ href, locale });
  return null;
}

export async function adminLoginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid email or password" };
  }

  try {
    await signIn("admin-signin", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }

  const locale = await getLocale();
  redirect({ href: "/admin", locale });
  return null;
}

export async function signupAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: "Please check your details and try again" };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email is already registered" };
  }

  const passwordHash = await hashPassword(password);

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role: "USER",
        },
      });
      await tx.cart.create({
        data: { userId: user.id },
      });
    });
  } catch {
    return { error: "Could not create account" };
  }

  try {
    await signIn("user-signin", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but sign-in failed" };
    }
    throw error;
  }

  const locale = await getLocale();
  redirect({ href: "/", locale });
  return null;
}

export async function logoutAction() {
  await signOut({ redirect: false });
  const locale = await getLocale();
  redirect({ href: "/", locale });
}
