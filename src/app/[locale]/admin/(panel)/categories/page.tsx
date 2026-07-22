import { Pencil, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mockAdminCategories } from "@/lib/mock-admin";

export default async function AdminCategoriesPage() {
  const t = await getTranslations("Admin");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
            {t("categoriesPage.title")}
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            {t("categoriesPage.subtitle")}
          </p>
        </div>
        <Link
          href="/admin/categories/add-category"
          className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          <Plus className="size-4" aria-hidden />
          {t("categoriesPage.add")}
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        <table className="w-full min-w-[480px] text-start text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-[#6B7280]">
              <th className="px-5 py-4 font-medium">{t("name")}</th>
              <th className="px-5 py-4 font-medium">{t("slug")}</th>
              <th className="px-5 py-4 font-medium">{t("productsCount")}</th>
              <th className="px-5 py-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {mockAdminCategories.map((category) => (
              <tr
                key={category.id}
                className="border-b border-gray-50 text-[#1A1A1A] last:border-0"
              >
                <td className="px-5 py-4 font-semibold">{category.name}</td>
                <td className="px-5 py-4 text-[#6B7280]">{category.slug}</td>
                <td className="px-5 py-4">{category.products}</td>
                <td className="px-5 py-4 text-end">
                  <button
                    type="button"
                    className="inline-flex size-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-gray-200"
                    aria-label={t("edit")}
                  >
                    <Pencil className="size-4" aria-hidden />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
