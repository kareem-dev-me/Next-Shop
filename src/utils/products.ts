import type { Prisma, Product } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { DEFAULT_PAGE_SIZE } from "./pagination";
import { createPrismaCrud } from "./prisma-crud";

const productCrud = createPrismaCrud(prisma.product);

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type CreateProductInput = {
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  stock: number;
  description?: string | null;
  image?: string | null;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export function stockStatus(stock: number) {
  if (stock === 0) return "out";
  if (stock <= 10) return "low";
  return "active";
}

export async function getProductsPage(
  pageParam?: string,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  const { items: products, pagination } =
    await productCrud.findPage<ProductWithCategory>({
      pageParam,
      pageSize,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

  return { products, pagination };
}

export async function getProductById(id: string) {
  return productCrud.findById<ProductWithCategory>(id, {
    include: { category: true },
  });
}

export async function getProductBySlug(slug: string) {
  return productCrud.findUnique<Product>({ where: { slug } });
}

export async function createProduct(data: CreateProductInput) {
  return productCrud.create<Product>({
    name: data.name,
    slug: data.slug,
    categoryId: data.categoryId,
    price: data.price,
    stock: data.stock,
    description: data.description ?? null,
    image: data.image ?? null,
  });
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  const updateData: Prisma.ProductUpdateInput = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.stock !== undefined) updateData.stock = data.stock;
  if (data.description !== undefined) {
    updateData.description = data.description;
  }
  if (data.image !== undefined) updateData.image = data.image;
  if (data.categoryId !== undefined) {
    updateData.category = { connect: { id: data.categoryId } };
  }

  return productCrud.update<Product>(id, updateData);
}

export async function deleteProduct(id: string) {
  return productCrud.delete<Product>(id);
}
