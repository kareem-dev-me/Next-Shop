import {
  FolderTree,
  LayoutDashboard,
  Package,
  Store,
  Users,
  UserSquare2,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const navItems = [
  { href: "/admin", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/admin/products", labelKey: "products", icon: Package },
  { href: "/admin/categories", labelKey: "categories", icon: FolderTree },
  { href: "/admin/customers", labelKey: "customers", icon: UserSquare2 },
  { href: "/admin/users", labelKey: "users", icon: Users },
] as const;

export default async function AdminSidebar() {
  const t = await getTranslations("Admin");

  return (
    <aside className="flex w-64 shrink-0 flex-col border-e border-gray-100 bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-5">
        <Image
          src="/icon.png"
          alt=""
          width={28}
          height={28}
          className="h-auto w-auto"
        />
        <span className="text-sm font-extrabold tracking-tight text-[#1A1A1A]">
          {t("brand")}
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ href, labelKey, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#1A1A1A]"
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {t(labelKey)}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-3 border-t border-gray-100 p-4">
        <LocaleSwitcher />
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
        >
          <Store className="size-4" aria-hidden />
          {t("backToStore")}
        </Link>
      </div>
    </aside>
  );
}
