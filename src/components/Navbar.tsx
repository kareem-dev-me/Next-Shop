import { ShoppingCart, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import LogoutButton from "./auth/LogoutButton";
import LocaleSwitcher from "./LocaleSwitcher";

export default async function Navbar() {
  const t = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/icon.png"
            alt=""
            width={32}
            height={32}
            className="h-auto w-auto"
          />
          <span className="text-lg font-extrabold tracking-tight text-[#1A1A1A]">
            {tCommon("brand")}
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#6B7280] md:flex">
          <Link href="/" className="transition-colors hover:text-[#1A1A1A]">
            {t("home")}
          </Link>
          <Link href="/cart" className="transition-colors hover:text-[#1A1A1A]">
            {t("cart")}
          </Link>
          <Link
            href="/profile"
            className="transition-colors hover:text-[#1A1A1A]"
          >
            {t("profile")}
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />

          <Link
            href="/cart"
            className="flex size-10 items-center justify-center rounded-full bg-[#22C55E] text-white transition-colors hover:bg-green-600"
            aria-label={t("cart")}
          >
            <ShoppingCart className="size-4" aria-hidden />
          </Link>

          {session?.user ? (
            <>
              <Link
                href="/profile"
                className="hidden max-w-[8rem] truncate text-sm font-semibold text-[#1A1A1A] sm:inline"
              >
                {session.user.name || session.user.email}
              </Link>
              <LogoutButton label={t("logout")} />
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[#F3F4F6] px-3.5 py-2 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
            >
              <span className="hidden sm:inline">{t("login")}</span>
              <User className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
