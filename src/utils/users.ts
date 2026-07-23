import type { Prisma, User } from "@/generated/prisma/client";
import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_SIZE } from "./pagination";
import { createPrismaCrud } from "./prisma-crud";

const userCrud = createPrismaCrud(prisma.user);

export type AdminUserListItem = {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN";
};

export type CreateAdminUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UpdateAdminUserInput = {
  name?: string;
  email?: string;
  password?: string;
};

export async function getUsersPage(
  pageParam?: string,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  const { items, pagination } = await userCrud.findPage<User>({
    pageParam,
    pageSize,
    where: { role: "ADMIN" },
    orderBy: { createdAt: "desc" },
  });

  const users: AdminUserListItem[] = items.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: "ADMIN",
  }));

  return { users, pagination };
}

export async function getAdminUserById(id: string) {
  const user = await userCrud.findById<User>(id);
  if (!user || user.role !== "ADMIN") {
    return null;
  }
  return user;
}

export async function countAdmins() {
  return userCrud.count({ where: { role: "ADMIN" } });
}

export async function createAdminUser(data: CreateAdminUserInput) {
  const passwordHash = await hashPassword(data.password);

  return userCrud.create<User>({
    name: data.name,
    email: data.email,
    password: passwordHash,
    role: "ADMIN",
  });
}

export async function updateAdminUser(id: string, data: UpdateAdminUserInput) {
  const user = await getAdminUserById(id);
  if (!user) {
    return null;
  }

  const updateData: Prisma.UserUpdateInput = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }

  return userCrud.update<User>(id, updateData);
}

export async function deleteAdminUser(id: string, currentUserId?: string) {
  const user = await getAdminUserById(id);
  if (!user) {
    return { ok: false as const, error: "User not found" };
  }

  if (currentUserId && currentUserId === id) {
    return { ok: false as const, error: "You cannot delete your own account" };
  }

  const adminCount = await countAdmins();
  if (adminCount <= 1) {
    return {
      ok: false as const,
      error: "Cannot delete the last admin account",
    };
  }

  await userCrud.delete<User>(id);
  return { ok: true as const };
}
