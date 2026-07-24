"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import {
  addToCart,
  CartError,
  removeFromCart,
  updateCartItemQuantity,
} from "@/utils/cart";

async function requireUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || session.user?.role !== "USER") {
    return null;
  }
  return userId;
}

async function revalidateCartPaths() {
  const locale = await getLocale();
  revalidatePath(`/${locale}/cart`);
  revalidatePath(`/${locale}/checkout`);
}

export async function addToCartAction(formData: FormData) {
  const userId = await requireUserId();
  const locale = await getLocale();

  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const productId = String(formData.get("productId") ?? "");
  if (!productId) {
    redirect({ href: "/", locale });
  }

  try {
    await addToCart(userId!, productId, 1);
  } catch (error) {
    if (!(error instanceof CartError)) {
      throw error;
    }
  }

  await revalidateCartPaths();
  redirect({ href: "/cart", locale });
}

export async function updateCartItemAction(formData: FormData) {
  const userId = await requireUserId();
  if (!userId) {
    return;
  }

  const productId = String(formData.get("productId") ?? "");
  const quantity = Number(formData.get("quantity"));
  if (!productId || !Number.isFinite(quantity)) {
    return;
  }

  try {
    await updateCartItemQuantity(userId, productId, quantity);
  } catch (error) {
    if (!(error instanceof CartError)) {
      throw error;
    }
  }

  await revalidateCartPaths();
}

export async function removeCartItemAction(formData: FormData) {
  const userId = await requireUserId();
  if (!userId) {
    return;
  }

  const productId = String(formData.get("productId") ?? "");
  if (!productId) {
    return;
  }

  await removeFromCart(userId, productId);
  await revalidateCartPaths();
}
