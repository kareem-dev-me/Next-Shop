import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import UserForm from "@/components/admin/UserForm";
import { getAdminUserById } from "@/utils/users";

type Props = {
  params: Promise<{ userId: string }>;
};

export default async function EditUserPage({ params }: Props) {
  const t = await getTranslations("Admin");
  const { userId } = await params;
  const user = await getAdminUserById(userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("editUser.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("editUser.subtitle")}</p>

      <UserForm
        mode="edit"
        userId={user.id}
        defaultValues={{
          name: user.name,
          email: user.email,
        }}
        labels={{
          name: t("name"),
          email: t("email"),
          password: t("password"),
          role: t("role"),
          passwordHint: t("editUser.passwordHint"),
          save: t("save"),
          cancel: t("cancel"),
        }}
      />
    </div>
  );
}
