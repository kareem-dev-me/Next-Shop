import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default async function AdminLoginPage() {
  const t = await getTranslations("Admin.login");
  const tAdmin = await getTranslations("Admin");
  const tCommon = await getTranslations("Common");

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/admin"
          className="mb-10 flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image src="/icon.png" alt="" width={36} height={36} />
          <span className="text-xl font-extrabold tracking-tight text-[#1A1A1A]">
            {tAdmin("brand")}
          </span>
        </Link>

        <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-10">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
            {t("title")}
          </h1>
          <p className="mt-2 text-center text-sm text-[#6B7280]">{t("subtitle")}</p>

          <LoginForm
            mode="admin"
            redirectTo="/admin"
            labels={{
              email: tAdmin("email"),
              emailPlaceholder: "admin@nextshop.com",
              password: tAdmin("password"),
              passwordPlaceholder: "••••••••",
              submit: t("submit"),
            }}
          />
        </div>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          <Link
            href="/"
            className="font-semibold text-[#22C55E] hover:text-green-600"
          >
            {tCommon("brand")}
          </Link>
        </p>
      </div>
    </div>
  );
}
