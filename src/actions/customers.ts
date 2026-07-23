"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { addCustomerSchema, updateCustomerSchema } from "@/schemas/customer";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
} from "@/utils/customers";
import prisma from "@/lib/prisma";

export type CustomerActionState = {
  error?: string;
} | null;

function parseCustomerForm(formData: FormData) {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
  };
}

export async function createCustomerAction(
  _prev: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const parsed = addCustomerSchema.safeParse(parseCustomerForm(formData));
  if (!parsed.success) {
    return { error: "Please check the customer details and try again" };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email is already registered" };
  }

  try {
    await createCustomer({ name, email, password });
  } catch {
    return { error: "Could not create customer" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/customers", locale });
  return null;
}

export async function updateCustomerAction(
  _prev: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const customerId = String(formData.get("customerId") ?? "");
  if (!customerId) {
    return { error: "Customer not found" };
  }

  const parsed = updateCustomerSchema.safeParse(parseCustomerForm(formData));
  if (!parsed.success) {
    return { error: "Please check the customer details and try again" };
  }

  const customer = await getCustomerById(customerId);
  if (!customer) {
    return { error: "Customer not found" };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== customerId) {
    return { error: "Email is already registered" };
  }

  try {
    await updateCustomer(customerId, {
      name,
      email,
      password,
    });
  } catch {
    return { error: "Could not update customer" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/customers", locale });
  return null;
}

export async function deleteCustomerAction(
  _prev: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const customerId = String(formData.get("customerId") ?? "");
  if (!customerId) {
    return { error: "Customer not found" };
  }

  const customer = await getCustomerById(customerId);
  if (!customer) {
    return { error: "Customer not found" };
  }

  try {
    await deleteCustomer(customerId);
  } catch {
    return { error: "Could not delete customer" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/customers", locale });
  return null;
}
