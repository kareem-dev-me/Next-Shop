import { ShoppingCart, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function ProfilePage() {
  const t = await getTranslations("Profile");

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("subtitle")}</p>

      <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A]">
            <User className="size-8" aria-hidden />
          </div>
          <p className="mt-4 text-lg font-bold text-[#1A1A1A]">{t("name")}</p>
          <p className="mt-1 text-sm text-[#6B7280]">{t("email")}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/cart"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            <ShoppingCart className="size-4" aria-hidden />
            {t("viewCart")}
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-[#F3F4F6] px-5 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
          >
            {t("login")}
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-[#9CA3AF]">
          {t("ordersNote")}
        </p>
      </div>
    </div>
  );
}
