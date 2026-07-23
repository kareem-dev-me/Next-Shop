import { getTranslations } from "next-intl/server";
import UserForm from "@/components/admin/UserForm";

export default async function AddUserPage() {
  const t = await getTranslations("Admin");

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("addUser.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("addUser.subtitle")}</p>

      <UserForm
        mode="create"
        labels={{
          name: t("name"),
          email: t("email"),
          password: t("password"),
          role: t("role"),
          save: t("save"),
          cancel: t("cancel"),
        }}
      />
    </div>
  );
}
