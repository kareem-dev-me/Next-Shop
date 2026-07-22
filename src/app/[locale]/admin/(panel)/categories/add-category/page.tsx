import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

export default async function AddCategoryPage() {
  const t = await getTranslations("Admin");

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("addCategory.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("addCategory.subtitle")}</p>

      <form
        action="#"
        className="mt-8 space-y-5 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8"
      >
        <div>
          <label htmlFor="name" className={labelClassName}>
            {t("name")}
          </label>
          <input id="name" name="name" required className={inputClassName} />
        </div>
        <div>
          <label htmlFor="slug" className={labelClassName}>
            {t("slug")}
          </label>
          <input id="slug" name="slug" required className={inputClassName} />
        </div>
        <div>
          <label htmlFor="description" className={labelClassName}>
            {t("description")}
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-2 w-full rounded-3xl border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40"
          />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("save")}
          </button>
          <Link
            href="/admin/categories"
            className="rounded-full bg-[#F3F4F6] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
          >
            {t("cancel")}
          </Link>
        </div>
      </form>
    </div>
  );
}
