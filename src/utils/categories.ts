import type { Category } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { createPrismaCrud } from "./prisma-crud";

const categoryCrud = createPrismaCrud(prisma.category);

export type CategoryOption = Pick<Category, "id" | "name">;

export async function listCategories() {
  return categoryCrud.findMany<CategoryOption>({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function getCategoryById(id: string) {
  return categoryCrud.findById<Category>(id);
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string | null;
}) {
  return categoryCrud.create<Category>({
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
  });
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string | null;
  },
) {
  return categoryCrud.update<Category>(id, data);
}

export async function deleteCategory(id: string) {
  return categoryCrud.delete<Category>(id);
}
