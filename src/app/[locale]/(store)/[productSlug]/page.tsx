import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getMockProductBySlug } from "@/lib/mock-products";

type Props = {
  params: Promise<{ productSlug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { productSlug } = await params;
  const product = getMockProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations("Product");
  const tProducts = await getTranslations("Products");

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
      >
        <ArrowLeft className="size-4 rtl:hidden" aria-hidden />
        <ArrowRight className="hidden size-4 rtl:inline" aria-hidden />
        {t("back")}
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
        <div
          className="flex aspect-square items-center justify-center rounded-3xl border border-gray-100"
          style={{ backgroundColor: `${product.accent}14` }}
        >
          <div
            className="size-40 rounded-full sm:size-52"
            style={{ backgroundColor: product.accent }}
          />
        </div>

        <div>
          <span className="inline-flex rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-[#6B7280]">
            {tProducts(product.categoryKey)}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
            {tProducts(product.nameKey)}
          </h1>
          <p className="mt-3 text-2xl font-bold text-[#1A1A1A]">
            ${product.price}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#6B7280]">
            {tProducts(product.descriptionKey)}
          </p>

          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("addToCart")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
