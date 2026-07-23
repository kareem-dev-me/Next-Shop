"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { addCategorySchema, updateCategorySchema } from "@/schemas/category";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
} from "@/utils/categories";

export type CategoryActionState = {
  error?: string;
} | null;

function parseCategoryForm(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") || undefined,
  };
}

export async function createCategoryAction(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const parsed = addCategorySchema.safeParse(parseCategoryForm(formData));
  if (!parsed.success) {
    return { error: "Please check the category details and try again" };
  }

  const { name, slug, description } = parsed.data;
  const existing = await getCategoryBySlug(slug);
  if (existing) {
    return { error: "A category with this slug already exists" };
  }

  try {
    await createCategory({
      name,
      slug,
      description,
    });
  } catch {
    return { error: "Could not create category" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/categories", locale });
  return null;
}

export async function updateCategoryAction(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const categoryId = String(formData.get("categoryId") ?? "");
  if (!categoryId) {
    return { error: "Category not found" };
  }

  const parsed = updateCategorySchema.safeParse(parseCategoryForm(formData));
  if (!parsed.success) {
    return { error: "Please check the category details and try again" };
  }

  const category = await getCategoryById(categoryId);
  if (!category) {
    return { error: "Category not found" };
  }

  const { name, slug, description } = parsed.data;
  const existing = await getCategoryBySlug(slug);
  if (existing && existing.id !== categoryId) {
    return { error: "A category with this slug already exists" };
  }

  try {
    await updateCategory(categoryId, {
      name,
      slug,
      description: description ?? null,
    });
  } catch {
    return { error: "Could not update category" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/categories", locale });
  return null;
}

export async function deleteCategoryAction(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const categoryId = String(formData.get("categoryId") ?? "");
  if (!categoryId) {
    return { error: "Category not found" };
  }

  const category = await getCategoryById(categoryId);
  if (!category) {
    return { error: "Category not found" };
  }

  try {
    await deleteCategory(categoryId);
  } catch {
    return {
      error:
        "Could not delete category. It may still have products assigned to it.",
    };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/categories", locale });
  return null;
}
