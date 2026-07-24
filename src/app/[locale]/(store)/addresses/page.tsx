import { MapPin, Plus } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { setDefaultAddressAction } from "@/actions/addresses";
import DeleteAddressButton from "@/components/addresses/DeleteAddressButton";
import { Link, redirect } from "@/i18n/navigation";
import { listAddresses } from "@/utils/addresses";

export default async function AddressesPage() {
  const t = await getTranslations("Addresses");
  const tAdmin = await getTranslations("Admin");
  const locale = await getLocale();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect({ href: "/login", locale });
  }

  const addresses = await listAddresses(userId!);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">{t("subtitle")}</p>
        </div>
        <Link
          href="/addresses/add"
          className="inline-flex items-center gap-2 self-start rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          <Plus className="size-4" aria-hidden />
          {t("add")}
        </Link>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-gray-200 py-16 text-center">
          <MapPin className="size-8 text-[#9CA3AF]" aria-hidden />
          <p className="text-sm text-[#6B7280]">{t("empty")}</p>
          <Link
            href="/addresses/add"
            className="inline-flex items-center rounded-full bg-[#1A1A1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("add")}
          </Link>
        </div>
      ) : (
        <ul className="mt-10 flex flex-col gap-4">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  {address.isDefault ? (
                    <span className="inline-flex rounded-full bg-[#22C55E]/15 px-2.5 py-0.5 text-xs font-semibold text-[#16A34A]">
                      {t("default")}
                    </span>
                  ) : null}
                  <p className="mt-2 font-semibold text-[#1A1A1A]">
                    {address.line1}
                  </p>
                  {address.line2 ? (
                    <p className="mt-0.5 text-sm text-[#6B7280]">
                      {address.line2}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {[address.city, address.state, address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p className="text-sm text-[#6B7280]">{address.country}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {!address.isDefault ? (
                    <form action={setDefaultAddressAction}>
                      <input
                        type="hidden"
                        name="addressId"
                        value={address.id}
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-[#F3F4F6] px-3.5 py-2 text-xs font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200 cursor-pointer"
                      >
                        {t("setDefault")}
                      </button>
                    </form>
                  ) : null}
                  <Link
                    href={`/addresses/${address.id}/edit`}
                    className="rounded-full bg-[#F3F4F6] px-3.5 py-2 text-xs font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
                  >
                    {t("edit")}
                  </Link>
                  <DeleteAddressButton
                    addressId={address.id}
                    label={t("delete")}
                    confirmTitle={t("delete")}
                    confirmMessage={t("deleteConfirm")}
                    confirmLabel={t("delete")}
                    cancelLabel={tAdmin("cancel")}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
