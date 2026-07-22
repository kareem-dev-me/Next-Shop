import { getTranslations } from "next-intl/server";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const t = await getTranslations("Auth.login");

  return (
    <div>
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-center text-sm text-[#6B7280]">{t("subtitle")}</p>

      <LoginForm
        labels={{
          email: t("email"),
          emailPlaceholder: t("emailPlaceholder"),
          password: t("password"),
          passwordPlaceholder: t("passwordPlaceholder"),
          forgot: t("forgot"),
          submit: t("submit"),
          noAccount: t("noAccount"),
          createAccount: t("createAccount"),
        }}
      />
    </div>
  );
}
