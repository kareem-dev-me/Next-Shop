import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryById } from "@/utils/categories";

type Props = {
  params: Promise<{ categoryId: string }>;
};

export default async function EditCategoryPage({ params }: Props) {
  const t = await getTranslations("Admin");
  const { categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("editCategory.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("editCategory.subtitle")}</p>

      <CategoryForm
        mode="edit"
        categoryId={category.id}
        defaultValues={{
          name: category.name,
          slug: category.slug,
          description: category.description,
        }}
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
