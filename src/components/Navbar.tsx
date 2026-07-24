import { ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import NavbarMenu from "./NavbarMenu";

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

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="flex size-10 items-center justify-center rounded-full bg-[#22C55E] text-white transition-colors hover:bg-green-600"
            aria-label={t("cart")}
          >
            <ShoppingCart className="size-4" aria-hidden />
          </Link>

          <NavbarMenu
            loggedIn={Boolean(session?.user)}
            userName={session?.user?.name || session?.user?.email}
            labels={{
              profile: t("profile"),
              login: t("login"),
              logout: t("logout"),
              account: t("account"),
            }}
          />
        </div>
      </nav>
    </header>
  );
}
