"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center rounded-full bg-[#F3F4F6] p-1 text-xs font-semibold">
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
              active
                ? "bg-white text-[#1A1A1A] shadow-sm"
                : "text-[#6B7280] hover:text-[#1A1A1A]"
            }`}
            aria-pressed={active}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
