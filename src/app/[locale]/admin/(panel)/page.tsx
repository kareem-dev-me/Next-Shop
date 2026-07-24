import { getTranslations } from "next-intl/server";
import { getDashboardStats, getRecentOrders } from "@/utils/dashboard";

export default async function AdminDashboardPage() {
  const t = await getTranslations("Admin");
  const [stats, recentOrders] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5),
  ]);

  const cards = [
    { key: "products", value: stats.products },
    { key: "orders", value: stats.orders },
    { key: "customers", value: stats.customers },
    { key: "revenue", value: `$${stats.revenue.toLocaleString()}` },
  ] as const;

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("dashboardPage.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("dashboardPage.subtitle")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.key}
            className="rounded-3xl border border-gray-100 bg-white p-6"
          >
            <p className="text-sm font-medium text-[#6B7280]">
              {t(`stats.${card.key}`)}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#1A1A1A]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-3xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-bold text-[#1A1A1A]">{t("recentOrders")}</h2>
        <div className="mt-4 overflow-x-auto">
          {recentOrders.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#6B7280]">
              {t("dashboardPage.noOrders")}
            </p>
          ) : (
            <table className="w-full min-w-[480px] text-start text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-[#6B7280]">
                  <th className="py-3 pe-4 font-medium">ID</th>
                  <th className="py-3 pe-4 font-medium">{t("customer")}</th>
                  <th className="py-3 pe-4 font-medium">{t("total")}</th>
                  <th className="py-3 font-medium">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 text-[#1A1A1A] last:border-0"
                  >
                    <td className="py-3 pe-4 font-medium">{order.shortId}</td>
                    <td className="py-3 pe-4">{order.customer}</td>
                    <td className="py-3 pe-4">${order.total}</td>
                    <td className="py-3">
                      <span className="inline-flex rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-semibold capitalize text-[#6B7280]">
                        {order.status.toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
