import { ArrowRight, Lock, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const inputClassName =
  "w-full rounded-full border-0 bg-[#F3F4F6] py-3.5 pe-5 ps-12 text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const iconClassName =
  "pointer-events-none absolute top-1/2 start-4 size-4 -translate-y-1/2 text-gray-400";

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

          <form action="#" className="mt-8 flex flex-col gap-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1A1A1A]"
              >
                {tAdmin("email")}
              </label>
              <div className="relative mt-2">
                <Mail className={iconClassName} aria-hidden />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClassName}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1A1A1A]"
              >
                {tAdmin("password")}
              </label>
              <div className="relative mt-2">
                <Lock className={iconClassName} aria-hidden />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={inputClassName}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              {t("submit")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          <Link href="/" className="font-semibold text-[#22C55E] hover:text-green-600">
            {tCommon("brand")}
          </Link>
        </p>
      </div>
    </div>
  );
}
