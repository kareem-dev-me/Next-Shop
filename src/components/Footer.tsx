import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { auth } from "@/auth";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tCommon = await getTranslations("Common");
  const year = new Date().getFullYear();
  const session = await auth();

  return (
    <footer className="mt-auto border-t border-gray-100 bg-[#F9FAFB]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80">
              <Image src="/icon.png" alt="" width={28} height={28} className="h-auto w-auto" />
              <span className="text-lg font-extrabold tracking-tight text-[#1A1A1A]">{tCommon("brand")}</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-[#6B7280]">{tCommon("tagline")}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="transition-colors hover:text-[#1A1A1A]">
              {t("home")}
            </Link>
            <Link href="/categories" className="transition-colors hover:text-[#1A1A1A]">
              {t("categories")}
            </Link>
            <Link href="/cart" className="transition-colors hover:text-[#1A1A1A]">
              {t("cart")}
            </Link>
            {session?.user ? (
              <Link href="/profile" className="transition-colors hover:text-[#1A1A1A]">
                {t("profile")}
              </Link>
            ) : (
              <Link href="/login" className="transition-colors hover:text-[#1A1A1A]">
                {t("login")}
              </Link>
            )}
          </div>
        </div>

        <p className="text-sm text-[#9CA3AF]">
          © {year} {tCommon("brand")}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
