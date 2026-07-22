import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { mockCartItems, mockProducts } from "@/lib/mock-products";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

const SHIPPING_FEE = 10;

export default async function CheckoutPage() {
  const t = await getTranslations("Checkout");
  const tCommon = await getTranslations("Common");
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
  const total = subtotal + SHIPPING_FEE;

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex items-center gap-2">
        <Image src="/icon.png" alt="" width={32} height={32} />
        <span className="text-lg font-extrabold tracking-tight text-[#1A1A1A]">
          {tCommon("brand")}
        </span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("subtitle")}</p>

      <form
        action="#"
        className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"
      >
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A]">{t("contact")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="email" className={labelClassName}>
                  {t("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputClassName}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className={labelClassName}>
                  {t("phone")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A1A1A]">{t("shipping")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelClassName}>
                  {t("fullName")}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className={inputClassName}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="line1" className={labelClassName}>
                  {t("line1")}
                </label>
                <input
                  id="line1"
                  name="line1"
                  type="text"
                  autoComplete="street-address"
                  required
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="city" className={labelClassName}>
                  {t("city")}
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="postal" className={labelClassName}>
                  {t("postal")}
                </label>
                <input
                  id="postal"
                  name="postal"
                  type="text"
                  autoComplete="postal-code"
                  required
                  className={inputClassName}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="country" className={labelClassName}>
                  {t("country")}
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  required
                  className={inputClassName}
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#1A1A1A]">
            {t("orderSummary")}
          </h2>

          <ul className="mt-6 flex flex-col gap-4">
            {lines.map((line) => (
              <li key={line.productId} className="flex items-center gap-3">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${line.product.accent}18` }}
                >
                  <div
                    className="size-5 rounded-full"
                    style={{ backgroundColor: line.product.accent }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1A1A1A]">
                    {tProducts(line.product.nameKey)}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {t("qty")}: {line.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#1A1A1A]">
                  ${line.product.price * line.quantity}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between text-[#6B7280]">
              <span>{t("subtotal")}</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-[#6B7280]">
              <span>{t("shippingFee")}</span>
              <span>${SHIPPING_FEE}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1A1A1A]">
              <span>{t("total")}</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("placeOrder")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </button>

          <Link
            href="/cart"
            className="mt-4 block text-center text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
          >
            {t("backToCart")}
          </Link>
        </aside>
      </form>
    </div>
  );
}
