import { getTranslations } from "next-intl/server";
import AddressForm from "@/components/addresses/AddressForm";

export default async function AddAddressPage() {
  const t = await getTranslations("Addresses");

  return (
    <div className="mx-auto w-full max-w-lg flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("addTitle")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("addSubtitle")}</p>

      <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
        <AddressForm
          mode="create"
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
