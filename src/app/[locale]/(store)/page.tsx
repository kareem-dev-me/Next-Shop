import { ArrowRight, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mockProducts } from "@/lib/mock-products";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const tProducts = await getTranslations("Products");

  return (
    <div className="relative flex flex-1 flex-col bg-white">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] w-full text-gray-200"
      >
        <defs>
          <pattern
            id="home-waves"
            width="120"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 Q30 5 60 20 T120 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#home-waves)" />
      </svg>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mb-6 inline-flex items-center gap-2 text-[#22C55E]">
          <Star className="size-5 fill-current" aria-hidden />
          <span className="text-sm font-semibold tracking-wide">
            {tCommon("brand")}
          </span>
        </div>

        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
          {t("headline")}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-[#6B7280] sm:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#featured"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("shopCta")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </a>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full bg-[#F3F4F6] px-6 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
          >
            {t("loginCta")}
          </Link>
        </div>
      </section>

      <section
        id="featured"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6"
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A]">
          {t("featured")}
        </h2>
        <p className="mt-2 text-sm text-[#6B7280]">{t("featuredSubtitle")}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mockProducts.map((product) => (
            <Link
              key={product.id}
              href={`/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-colors hover:border-gray-200"
            >
              <div
                className="flex aspect-square items-center justify-center"
                style={{ backgroundColor: `${product.accent}14` }}
              >
                <div
                  className="size-24 rounded-full opacity-90 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: product.accent }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="inline-flex w-fit rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
                  {tProducts(product.categoryKey)}
                </span>
                <h3 className="font-bold text-[#1A1A1A]">
                  {tProducts(product.nameKey)}
                </h3>
                <p className="mt-auto text-sm font-semibold text-[#1A1A1A]">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
