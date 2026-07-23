import { getTranslations } from "next-intl/server";
import CustomerForm from "@/components/admin/CustomerForm";

export default async function AddCustomerPage() {
  const t = await getTranslations("Admin");

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("addCustomer.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("addCustomer.subtitle")}</p>

      <CustomerForm
        mode="create"
        labels={{
          name: t("name"),
          email: t("email"),
          password: t("password"),
          save: t("save"),
          cancel: t("cancel"),
        }}
      />
    </div>
  );
}
