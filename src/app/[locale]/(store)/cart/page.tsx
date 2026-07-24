import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { auth } from "@/auth";
import CartItemControls from "@/components/cart/CartItemControls";
import { Link, redirect } from "@/i18n/navigation";
import { getCartForUser } from "@/utils/cart";

export default async function CartPage() {
  const t = await getTranslations("Cart");
  const locale = await getLocale();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const cart = await getCartForUser(userId!);
  const { items, subtotal } = cart;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("subtitle")}</p>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-6">
          <p className="text-center text-[#6B7280]">{t("empty")}</p>
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[#1A1A1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("continue")}
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 flex flex-col gap-4">
            {items.map((line) => (
              <li
                key={line.id}
                className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/${line.product.slug}`}
                  className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F3F4F6]"
                >
                  {line.product.image ? (
                    <Image
                      src={line.product.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="size-8 rounded-full bg-[#22C55E]/40" />
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/${line.product.slug}`}
                    className="font-semibold text-[#1A1A1A] hover:underline"
                  >
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    ${line.product.price} · {t("qty")}: {line.quantity}
                  </p>
                  <div className="mt-3">
                    <CartItemControls
                      productId={line.productId}
                      quantity={line.quantity}
                      maxStock={line.product.stock}
                      labels={{
                        qty: t("qty"),
                        increase: t("increase"),
                        decrease: t("decrease"),
                        remove: t("remove"),
                      }}
                    />
                  </div>
                </div>

                <p className="shrink-0 font-semibold text-[#1A1A1A] sm:text-end">
                  ${line.lineTotal}
                </p>
              </li>
            ))}
          </ul>

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
        </>
      )}
    </div>
  );
}
