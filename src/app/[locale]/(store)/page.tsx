import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { auth } from "@/auth";
import { listStoreCategories } from "@/utils/categories";
import { getFeaturedProducts } from "@/utils/products";

const HERO_IMAGE =
  "https://picsum.photos/seed/next-shop-hero/2400/1600";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const tCategories = await getTranslations("Categories");
  const session = await auth();
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    listStoreCategories(),
  ]);

  return (
    <div className="relative flex flex-1 flex-col bg-white">
      <section className="relative isolate min-h-[calc(100svh-4rem)] w-full overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/45 to-[#1A1A1A]/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-[#1A1A1A]/55 via-transparent to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:pb-24">
          <p className="hero-fade-up hero-fade-up-delay-1 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {tCommon("brand")}
          </p>
          <h1 className="hero-fade-up hero-fade-up-delay-2 mt-3 max-w-xl text-xl font-medium tracking-tight text-white/90 sm:text-2xl lg:text-3xl">
            {t("headline")}
          </h1>
          <p className="hero-fade-up hero-fade-up-delay-2 mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            {t("subtitle")}
          </p>

          <div className="hero-fade-up hero-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              {t("shopCta")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </a>
            {!session?.user && (
              <Link
                href="/login"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {t("loginCta")}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A]">
              {t("categories")}
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              {t("categoriesSubtitle")}
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] transition-colors hover:text-green-600"
          >
            {t("viewAllCategories")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="mt-8 rounded-3xl border border-dashed border-gray-200 py-12 text-center text-sm text-[#6B7280]">
            {tCategories("empty")}
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="rounded-3xl border border-gray-100 bg-white p-5 transition-colors hover:border-gray-200"
              >
                <h3 className="font-bold text-[#1A1A1A]">{category.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                  {tCategories("productsCount", {
                    count: category.productsCount,
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section
        id="featured"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A]">
          {t("featured")}
        </h2>
        <p className="mt-2 text-sm text-[#6B7280]">{t("featuredSubtitle")}</p>

        {products.length === 0 ? (
          <p className="mt-8 rounded-3xl border border-dashed border-gray-200 py-16 text-center text-sm text-[#6B7280]">
            {t("noProducts")}
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  <h3 className="font-bold text-[#1A1A1A]">{product.name}</h3>
                  <p className="mt-auto text-sm font-semibold text-[#1A1A1A]">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
