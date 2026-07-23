import type { Prisma, User } from "@/generated/prisma/client";
import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_SIZE } from "./pagination";
import { createPrismaCrud } from "./prisma-crud";

const userCrud = createPrismaCrud(prisma.user);

type CustomerWithOrders = Prisma.UserGetPayload<{
  include: {
    orders: { select: { total: true } };
    _count: { select: { orders: true } };
  };
}>;

export type CustomerListItem = {
  id: string;
  name: string | null;
  email: string;
  orders: number;
  spent: number;
};

export type CreateCustomerInput = {
  name: string;
  email: string;
  password: string;
};

export type UpdateCustomerInput = {
  name?: string;
  email?: string;
  password?: string;
};

function toCustomerListItem(user: CustomerWithOrders): CustomerListItem {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    orders: user._count.orders,
    spent: user.orders.reduce((sum, order) => sum + order.total, 0),
  };
}

export async function getCustomersPage(
  pageParam?: string,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  const { items, pagination } = await userCrud.findPage<CustomerWithOrders>({
    pageParam,
    pageSize,
    where: { role: "USER" },
    include: {
      orders: { select: { total: true } },
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    customers: items.map(toCustomerListItem),
    pagination,
  };
}

export async function getCustomerById(id: string) {
  const user = await userCrud.findById<User>(id);
  if (!user || user.role !== "USER") {
    return null;
  }
  return user;
}

export async function getCustomerByEmail(email: string) {
  const user = await userCrud.findUnique<User>({ where: { email } });
  if (!user || user.role !== "USER") {
    return null;
  }
  return user;
}

export async function createCustomer(data: CreateCustomerInput) {
  const passwordHash = await hashPassword(data.password);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        role: "USER",
      },
    });
    await tx.cart.create({
      data: { userId: user.id },
    });
    return user;
  });
}

export async function updateCustomer(id: string, data: UpdateCustomerInput) {
  const customer = await getCustomerById(id);
  if (!customer) {
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

export async function deleteCustomer(id: string) {
  const customer = await getCustomerById(id);
  if (!customer) {
    return null;
  }
  return userCrud.delete<User>(id);
}
