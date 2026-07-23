import { getTranslations } from "next-intl/server";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function AddCategoryPage() {
  const t = await getTranslations("Admin");

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("addCategory.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("addCategory.subtitle")}</p>

      <CategoryForm
        mode="create"
        labels={{
          name: t("name"),
          slug: t("slug"),
          description: t("description"),
          save: t("save"),
          cancel: t("cancel"),
        }}
      />
    </div>
  );
}
