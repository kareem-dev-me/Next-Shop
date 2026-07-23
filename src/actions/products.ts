"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { addProductSchema, updateProductSchema } from "@/schemas/product";
import { getCategoryById } from "@/utils/categories";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductBySlug,
  updateProduct,
} from "@/utils/products";

export type ProductActionState = {
  error?: string;
} | null;

function parseProductForm(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    categoryId: formData.get("categoryId"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    description: formData.get("description") || undefined,
    image: formData.get("image") || undefined,
  };
}

export async function createProductAction(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const parsed = addProductSchema.safeParse(parseProductForm(formData));

  if (!parsed.success) {
    return { error: "Please check the product details and try again" };
  }

  const { name, slug, categoryId, price, stock, description, image } =
    parsed.data;

  const category = await getCategoryById(categoryId);
  if (!category) {
    return { error: "Selected category was not found" };
  }

  const existing = await getProductBySlug(slug);
  if (existing) {
    return { error: "A product with this slug already exists" };
  }

  try {
    await createProduct({
      name,
      slug,
      categoryId,
      price,
      stock,
      description,
      image,
    });
  } catch {
    return { error: "Could not create product" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/products", locale });
  return null;
}

export async function updateProductAction(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const productId = String(formData.get("productId") ?? "");
  if (!productId) {
    return { error: "Product not found" };
  }

  const parsed = updateProductSchema.safeParse(parseProductForm(formData));
  if (!parsed.success) {
    return { error: "Please check the product details and try again" };
  }

  const product = await getProductById(productId);
  if (!product) {
    return { error: "Product not found" };
  }

  const { name, slug, categoryId, price, stock, description, image } =
    parsed.data;

  const category = await getCategoryById(categoryId);
  if (!category) {
    return { error: "Selected category was not found" };
  }

  const existing = await getProductBySlug(slug);
  if (existing && existing.id !== productId) {
    return { error: "A product with this slug already exists" };
  }

  try {
    await updateProduct(productId, {
      name,
      slug,
      categoryId,
      price,
      stock,
      description: description ?? null,
      image: image ?? null,
    });
  } catch {
    return { error: "Could not update product" };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/products", locale });
  return null;
}

export async function deleteProductAction(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const productId = String(formData.get("productId") ?? "");
  if (!productId) {
    return { error: "Product not found" };
  }

  const product = await getProductById(productId);
  if (!product) {
    return { error: "Product not found" };
  }

  try {
    await deleteProduct(productId);
  } catch {
    return {
      error: "Could not delete product. It may be linked to existing orders.",
    };
  }

  const locale = await getLocale();
  redirect({ href: "/admin/products", locale });
  return null;
}
