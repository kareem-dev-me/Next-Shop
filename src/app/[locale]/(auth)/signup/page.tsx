import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const inputClassName =
  "w-full rounded-full border-0 bg-[#F3F4F6] py-3.5 pe-5 ps-12 text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

const buttonClassName =
  "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2";

const iconClassName =
  "pointer-events-none absolute top-1/2 start-4 size-4 -translate-y-1/2 text-gray-400";

export default async function SignupPage() {
  const t = await getTranslations("Auth.signup");

  return (
    <div>
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-center text-sm text-[#6B7280]">{t("subtitle")}</p>

      <form action="#" className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="name" className={labelClassName}>
            {t("name")}
          </label>
          <div className="relative mt-2">
            <User className={iconClassName} aria-hidden />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder={t("namePlaceholder")}
              className={inputClassName}
            />
          </div>
        </div>

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
          <label htmlFor="password" className={labelClassName}>
            {t("password")}
          </label>
          <div className="relative mt-2">
            <Lock className={iconClassName} aria-hidden />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder={t("passwordPlaceholder")}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClassName}>
            {t("confirmPassword")}
          </label>
          <div className="relative mt-2">
            <Lock className={iconClassName} aria-hidden />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
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
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="font-semibold text-[#22C55E] hover:text-green-600"
        >
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
