import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getStoreCategoryBySlug } from "@/utils/categories";

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const category = await getStoreCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const t = await getTranslations("Categories");
  const { products } = category;

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
      >
        <ArrowLeft className="size-4 rtl:hidden" aria-hidden />
        <ArrowRight className="hidden size-4 rtl:inline" aria-hidden />
        {t("back")}
      </Link>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {category.name}
      </h1>
      {category.description ? (
        <p className="mt-2 max-w-2xl text-sm text-[#6B7280]">
          {category.description}
        </p>
      ) : null}
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
        {t("productsCount", { count: products.length })}
      </p>

      {products.length === 0 ? (
        <p className="mt-12 rounded-3xl border border-dashed border-gray-200 py-16 text-center text-sm text-[#6B7280]">
          {t("noProducts")}
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-colors hover:border-gray-200"
            >
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#F3F4F6]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="size-24 rounded-full bg-[#22C55E]/20 transition-transform group-hover:scale-105">
                    <div className="m-4 size-16 rounded-full bg-[#22C55E]/40" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="inline-flex w-fit rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
                  {product.category.name}
                </span>
                <h2 className="font-bold text-[#1A1A1A]">{product.name}</h2>
                <p className="mt-auto text-sm font-semibold text-[#1A1A1A]">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
