import { ArrowRight, Lock, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const inputClassName =
  "w-full rounded-full border-0 bg-[#F3F4F6] py-3.5 pe-5 ps-12 text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

const buttonClassName =
  "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2";

const iconClassName =
  "pointer-events-none absolute top-1/2 start-4 size-4 -translate-y-1/2 text-gray-400";

export default async function LoginPage() {
  const t = await getTranslations("Auth.login");

  return (
    <div>
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-center text-sm text-[#6B7280]">{t("subtitle")}</p>

      <form action="#" className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="email" className={labelClassName}>
            {t("email")}
          </label>
          <div className="relative mt-2">
            <Mail className={iconClassName} aria-hidden />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={t("emailPlaceholder")}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="password" className={labelClassName}>
              {t("password")}
            </label>
            <Link
              href="#"
              className="text-sm font-medium text-[#22C55E] hover:text-green-600"
            >
              {t("forgot")}
            </Link>
          </div>
          <div className="relative mt-2">
            <Lock className={iconClassName} aria-hidden />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder={t("passwordPlaceholder")}
              className={inputClassName}
            />
          </div>
        </div>

        <button type="submit" className={buttonClassName}>
          {t("submit")}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-[#6B7280]">
        {t("noAccount")}{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#22C55E] hover:text-green-600"
        >
          {t("createAccount")}
        </Link>
      </p>
    </div>
  );
}
