import type { Category, Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_SIZE } from "./pagination";
import { createPrismaCrud } from "./prisma-crud";

const categoryCrud = createPrismaCrud(prisma.category);

export type CategoryOption = Pick<Category, "id" | "name">;

export type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: { _count: { select: { products: true } } };
}>;

export type CreateCategoryInput = {
  name: string;
  slug: string;
  description?: string | null;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export async function listCategories() {
  return categoryCrud.findMany<CategoryOption>({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function getCategoriesPage(
  pageParam?: string,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  const { items: categories, pagination } =
    await categoryCrud.findPage<CategoryWithCount>({
      pageParam,
      pageSize,
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    });

  return { categories, pagination };
}

export async function getCategoryById(id: string) {
  return categoryCrud.findById<Category>(id);
}

export async function getCategoryBySlug(slug: string) {
  return categoryCrud.findUnique<Category>({ where: { slug } });
}

export async function createCategory(data: CreateCategoryInput) {
  return categoryCrud.create<Category>({
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
  });
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  return categoryCrud.update<Category>(id, {
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.slug !== undefined ? { slug: data.slug } : {}),
    ...(data.description !== undefined
      ? { description: data.description }
      : {}),
  });
}

export async function deleteCategory(id: string) {
  return categoryCrud.delete<Category>(id);
}
