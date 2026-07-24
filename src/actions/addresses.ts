"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { addressSchema } from "@/schemas/address";
import {
  createAddress,
  deleteAddress,
  getAddressForUser,
  setDefaultAddress,
  updateAddress,
} from "@/utils/addresses";

export type AddressActionState = {
  error?: string;
} | null;

async function requireUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || session.user?.role !== "USER") {
    return null;
  }
  return userId;
}

function parseAddressForm(formData: FormData) {
  return {
    line1: formData.get("line1"),
    line2: formData.get("line2") || undefined,
    city: formData.get("city"),
    state: formData.get("state") || undefined,
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    isDefault: formData.get("isDefault"),
  };
}

async function revalidateAddresses() {
  const locale = await getLocale();
  revalidatePath(`/${locale}/addresses`);
}

export async function createAddressAction(
  _prev: AddressActionState,
  formData: FormData,
): Promise<AddressActionState> {
  const userId = await requireUserId();
  const locale = await getLocale();
  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const parsed = addressSchema.safeParse(parseAddressForm(formData));
  if (!parsed.success) {
    return { error: "Please check the address details and try again" };
  }

  try {
    await createAddress(userId!, parsed.data);
  } catch {
    return { error: "Could not create address" };
  }

  await revalidateAddresses();
  redirect({ href: "/addresses", locale });
  return null;
}

export async function updateAddressAction(
  _prev: AddressActionState,
  formData: FormData,
): Promise<AddressActionState> {
  const userId = await requireUserId();
  const locale = await getLocale();
  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const addressId = String(formData.get("addressId") ?? "");
  if (!addressId) {
    return { error: "Address not found" };
  }

  const existing = await getAddressForUser(userId!, addressId);
  if (!existing) {
    return { error: "Address not found" };
  }

  const parsed = addressSchema.safeParse(parseAddressForm(formData));
  if (!parsed.success) {
    return { error: "Please check the address details and try again" };
  }

  try {
    await updateAddress(userId!, addressId, parsed.data);
  } catch {
    return { error: "Could not update address" };
  }

  await revalidateAddresses();
  redirect({ href: "/addresses", locale });
  return null;
}

export async function deleteAddressAction(
  _prev: AddressActionState,
  formData: FormData,
): Promise<AddressActionState> {
  const userId = await requireUserId();
  if (!userId) {
    return { error: "You must be signed in" };
  }

  const addressId = String(formData.get("addressId") ?? "");
  if (!addressId) {
    return { error: "Address not found" };
  }

  try {
    const deleted = await deleteAddress(userId, addressId);
    if (!deleted) {
      return { error: "Address not found" };
    }
  } catch {
    return { error: "Could not delete address" };
  }

  await revalidateAddresses();
  return null;
}

export async function setDefaultAddressAction(formData: FormData) {
  const userId = await requireUserId();
  if (!userId) {
    return;
  }

  const addressId = String(formData.get("addressId") ?? "");
  if (!addressId) {
    return;
  }

  await setDefaultAddress(userId, addressId);
  await revalidateAddresses();
}
