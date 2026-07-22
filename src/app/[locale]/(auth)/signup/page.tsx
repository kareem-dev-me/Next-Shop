import { getTranslations } from "next-intl/server";
import SignupForm from "@/components/auth/SignupForm";

export default async function SignupPage() {
  const t = await getTranslations("Auth.signup");

  return (
    <div>
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-center text-sm text-[#6B7280]">{t("subtitle")}</p>

      <SignupForm
        labels={{
          name: t("name"),
          namePlaceholder: t("namePlaceholder"),
          email: t("email"),
          emailPlaceholder: t("emailPlaceholder"),
          password: t("password"),
          passwordPlaceholder: t("passwordPlaceholder"),
          confirmPassword: t("confirmPassword"),
          submit: t("submit"),
          hasAccount: t("hasAccount"),
          signIn: t("signIn"),
        }}
      />
    </div>
  );
}
