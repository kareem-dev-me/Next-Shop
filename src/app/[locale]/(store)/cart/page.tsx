import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mockCartItems, mockProducts } from "@/lib/mock-products";

export default async function CartPage() {
  const t = await getTranslations("Cart");
  const tProducts = await getTranslations("Products");

  const lines = mockCartItems
    .map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as Array<{
    productId: string;
    quantity: number;
    product: (typeof mockProducts)[number];
  }>;

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("subtitle")}</p>

      {lines.length === 0 ? (
        <p className="mt-12 text-center text-[#6B7280]">{t("empty")}</p>
      ) : (
        <ul className="mt-10 flex flex-col gap-4">
          {lines.map((line) => (
            <li
              key={line.productId}
              className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-4"
            >
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${line.product.accent}18` }}
              >
                <div
                  className="size-8 rounded-full"
                  style={{ backgroundColor: line.product.accent }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#1A1A1A]">
                  {tProducts(line.product.nameKey)}
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {t("qty")}: {line.quantity}
                </p>
              </div>
              <p className="shrink-0 font-semibold text-[#1A1A1A]">
                ${line.product.price * line.quantity}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-semibold text-[#1A1A1A]">
          {t("subtotal")}: ${subtotal}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[#F3F4F6] px-5 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
          >
            {t("continue")}
          </Link>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("checkout")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
