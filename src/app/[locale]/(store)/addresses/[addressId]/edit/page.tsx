import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import AddressForm from "@/components/addresses/AddressForm";
import { redirect } from "@/i18n/navigation";
import { getAddressForUser } from "@/utils/addresses";

type Props = {
  params: Promise<{ addressId: string }>;
};

export default async function EditAddressPage({ params }: Props) {
  const { addressId } = await params;
  const t = await getTranslations("Addresses");
  const locale = await getLocale();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const address = await getAddressForUser(userId!, addressId);
  if (!address) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-lg flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("editTitle")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("editSubtitle")}</p>

      <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
        <AddressForm
          mode="edit"
          addressId={address.id}
          defaultValues={{
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
            isDefault: address.isDefault,
          }}
          labels={{
            line1: t("line1"),
            line2: t("line2"),
            city: t("city"),
            state: t("state"),
            postalCode: t("postalCode"),
            country: t("country"),
            isDefault: t("isDefault"),
            save: t("save"),
            cancel: t("cancel"),
          }}
        />
      </div>
    </div>
  );
}
