import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ProductForm from "@/components/admin/ProductForm";
import { listCategories } from "@/utils/categories";
import { getProductById } from "@/utils/products";

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const t = await getTranslations("Admin");
  const { productId } = await params;
  const [product, categories] = await Promise.all([
    getProductById(productId),
    listCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("editProduct.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("editProduct.subtitle")}</p>

      <ProductForm
        mode="edit"
        productId={product.id}
        categories={categories}
        defaultValues={{
          name: product.name,
          slug: product.slug,
          categoryId: product.categoryId,
          price: product.price,
          stock: product.stock,
          description: product.description,
          image: product.image,
        }}
        labels={{
          name: t("name"),
          slug: t("slug"),
          category: t("category"),
          price: t("price"),
          stock: t("stock"),
          description: t("description"),
          image: t("addProduct.image"),
          imagePlaceholder: t("addProduct.imagePlaceholder"),
          selectCategory: t("addProduct.selectCategory"),
          noCategories: t("addProduct.noCategories"),
          save: t("save"),
          cancel: t("cancel"),
        }}
      />
    </div>
  );
}
