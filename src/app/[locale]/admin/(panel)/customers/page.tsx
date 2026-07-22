import { getTranslations } from "next-intl/server";
import { mockAdminCustomers } from "@/lib/mock-admin";

export default async function AdminCustomersPage() {
  const t = await getTranslations("Admin");

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("customersPage.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">
        {t("customersPage.subtitle")}
      </p>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        <table className="w-full min-w-[560px] text-start text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-[#6B7280]">
              <th className="px-5 py-4 font-medium">{t("name")}</th>
              <th className="px-5 py-4 font-medium">{t("email")}</th>
              <th className="px-5 py-4 font-medium">{t("orders")}</th>
              <th className="px-5 py-4 font-medium">{t("spent")}</th>
            </tr>
          </thead>
          <tbody>
            {mockAdminCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-gray-50 text-[#1A1A1A] last:border-0"
              >
                <td className="px-5 py-4 font-semibold">{customer.name}</td>
                <td className="px-5 py-4 text-[#6B7280]">{customer.email}</td>
                <td className="px-5 py-4">{customer.orders}</td>
                <td className="px-5 py-4">${customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
