import { ArrowRight, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { auth } from "@/auth";
import CheckoutAddressList from "@/components/checkout/CheckoutAddressList";
import { Link, redirect } from "@/i18n/navigation";
import { listAddresses } from "@/utils/addresses";
import { getCartForUser } from "@/utils/cart";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

const SHIPPING_FEE = 10;

export default async function CheckoutPage() {
  const t = await getTranslations("Checkout");
  const tCommon = await getTranslations("Common");
  const tCart = await getTranslations("Cart");
  const tAddresses = await getTranslations("Addresses");
  const locale = await getLocale();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const [cart, addresses] = await Promise.all([
    getCartForUser(userId!),
    listAddresses(userId!),
  ]);
  const { items, subtotal } = cart;

  if (items.length === 0) {
    redirect({ href: "/cart", locale });
  }

  const total = subtotal + SHIPPING_FEE;
  const selectedAddressId =
    addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id;

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 flex items-center gap-2">
        <Image
          src="/icon.png"
          alt=""
          width={32}
          height={32}
          className="h-auto w-auto"
        />
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
                  defaultValue={session?.user?.email ?? ""}
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
                  defaultValue={session?.user?.name ?? ""}
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                {t("shipping")}
              </h2>
              <Link
                href="/addresses"
                className="text-sm font-medium text-[#22C55E] transition-colors hover:text-green-600"
              >
                {t("manageAddresses")}
              </Link>
            </div>

            {addresses.length === 0 || !selectedAddressId ? (
              <div className="mt-4 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-gray-200 py-10 text-center">
                <MapPin className="size-7 text-[#9CA3AF]" aria-hidden />
                <p className="text-sm text-[#6B7280]">{t("noAddresses")}</p>
                <Link
                  href="/addresses/add"
                  className="inline-flex items-center rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
                >
                  {tAddresses("add")}
                </Link>
              </div>
            ) : (
              <CheckoutAddressList
                addresses={addresses}
                initialSelectedId={selectedAddressId}
                defaultLabel={tAddresses("default")}
                legend={t("selectAddress")}
              />
            )}
          </section>
        </div>

        <aside className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#1A1A1A]">
            {t("orderSummary")}
          </h2>

          <ul className="mt-6 flex flex-col gap-4">
            {items.map((line) => (
              <li key={line.id} className="flex items-center gap-3">
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F3F4F6]">
                  {line.product.image ? (
                    <Image
                      src={line.product.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="size-5 rounded-full bg-[#22C55E]/40" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1A1A1A]">
                    {line.product.name}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {tCart("qty")}: {line.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#1A1A1A]">
                  ${line.lineTotal}
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
            disabled={addresses.length === 0}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
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
