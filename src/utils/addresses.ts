import prisma from "@/lib/prisma";
import type { AddressInput } from "@/schemas/address";

export type AddressRecord = {
  id: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

async function clearDefaultAddresses(userId: string, exceptId?: string) {
  await prisma.address.updateMany({
    where: {
      userId,
      isDefault: true,
      ...(exceptId ? { id: { not: exceptId } } : {}),
    },
    data: { isDefault: false },
  });
}

export async function listAddresses(userId: string): Promise<AddressRecord[]> {
  return prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      line1: true,
      line2: true,
      city: true,
      state: true,
      postalCode: true,
      country: true,
      isDefault: true,
    },
  });
}

export async function getAddressForUser(userId: string, id: string) {
  return prisma.address.findFirst({
    where: { id, userId },
  });
}

export async function createAddress(userId: string, data: AddressInput) {
  const count = await prisma.address.count({ where: { userId } });
  const makeDefault = data.isDefault || count === 0;

  if (makeDefault) {
    await clearDefaultAddresses(userId);
  }

  return prisma.address.create({
    data: {
      userId,
      line1: data.line1,
      line2: data.line2 ?? null,
      city: data.city,
      state: data.state ?? null,
      postalCode: data.postalCode,
      country: data.country,
      isDefault: makeDefault,
    },
  });
}

export async function updateAddress(
  userId: string,
  id: string,
  data: AddressInput,
) {
  const existing = await getAddressForUser(userId, id);
  if (!existing) {
    return null;
  }

  if (data.isDefault) {
    await clearDefaultAddresses(userId, id);
  }

  return prisma.address.update({
    where: { id },
    data: {
      line1: data.line1,
      line2: data.line2 ?? null,
      city: data.city,
      state: data.state ?? null,
      postalCode: data.postalCode,
      country: data.country,
      isDefault: data.isDefault ? true : existing.isDefault,
    },
  });
}

export async function setDefaultAddress(userId: string, id: string) {
  const existing = await getAddressForUser(userId, id);
  if (!existing) {
    return null;
  }

  await clearDefaultAddresses(userId, id);
  return prisma.address.update({
    where: { id },
    data: { isDefault: true },
  });
}

export async function deleteAddress(userId: string, id: string) {
  const existing = await getAddressForUser(userId, id);
  if (!existing) {
    return null;
  }

  await prisma.address.delete({ where: { id } });

  if (existing.isDefault) {
    const next = await prisma.address.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
    if (next) {
      await prisma.address.update({
        where: { id: next.id },
        data: { isDefault: true },
      });
    }
  }

  return existing;
}
