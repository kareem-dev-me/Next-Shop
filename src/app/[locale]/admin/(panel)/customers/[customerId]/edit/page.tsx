import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import CustomerForm from "@/components/admin/CustomerForm";
import { getCustomerById } from "@/utils/customers";

type Props = {
  params: Promise<{ customerId: string }>;
};

export default async function EditCustomerPage({ params }: Props) {
  const t = await getTranslations("Admin");
  const { customerId } = await params;
  const customer = await getCustomerById(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("editCustomer.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("editCustomer.subtitle")}</p>

      <CustomerForm
        mode="edit"
        customerId={customer.id}
        defaultValues={{
          name: customer.name,
          email: customer.email,
        }}
        labels={{
          name: t("name"),
          email: t("email"),
          password: t("password"),
          passwordHint: t("editCustomer.passwordHint"),
          save: t("save"),
          cancel: t("cancel"),
        }}
      />
    </div>
  );
}
