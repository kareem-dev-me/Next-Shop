import { FolderTree } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listStoreCategories } from "@/utils/categories";

export default async function CategoriesPage() {
  const t = await getTranslations("Categories");
  const categories = await listStoreCategories();

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("subtitle")}</p>

      {categories.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-gray-200 py-16 text-center">
          <FolderTree className="size-8 text-[#9CA3AF]" aria-hidden />
          <p className="text-sm text-[#6B7280]">{t("empty")}</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-3xl border border-gray-100 bg-white p-6 transition-colors hover:border-gray-200"
            >
              <h2 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#22C55E]">
                {category.name}
              </h2>
              {category.description ? (
                <p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">
                  {category.description}
                </p>
              ) : null}
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                {t("productsCount", { count: category.productsCount })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
