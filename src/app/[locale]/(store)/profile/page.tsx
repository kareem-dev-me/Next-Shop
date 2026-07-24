import { MapPin, ShoppingCart } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Link, redirect } from "@/i18n/navigation";
import ProfileForm from "@/components/profile/ProfileForm";
import { getProfileUser } from "@/utils/profile";

export default async function ProfilePage() {
  const t = await getTranslations("Profile");
  const locale = await getLocale();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const user = await getProfileUser(userId!);
  if (!user) {
    redirect({ href: "/login", locale });
  }

  const profile = user!;
  const displayName = profile.name?.trim() || profile.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("subtitle")}</p>

      <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#22C55E]/15 text-2xl font-extrabold text-[#22C55E]">
            {initial}
          </div>
          <p className="mt-4 text-lg font-bold text-[#1A1A1A]">{displayName}</p>
          <p className="mt-1 text-sm text-[#6B7280]">{profile.email}</p>
        </div>

        <ProfileForm
          defaultValues={{ name: profile.name, email: profile.email }}
          labels={{
            name: t("nameLabel"),
            email: t("emailLabel"),
            password: t("password"),
            passwordHint: t("passwordHint"),
            save: t("save"),
            success: t("success"),
          }}
        />

        <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6">
          <Link
            href="/addresses"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F3F4F6] px-5 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
          >
            <MapPin className="size-4" aria-hidden />
            {t("manageAddresses")}
          </Link>
          <Link
            href="/cart"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F3F4F6] px-5 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
          >
            <ShoppingCart className="size-4" aria-hidden />
            {t("viewCart")}
          </Link>
        </div>
      </div>
    </div>
  );
}
