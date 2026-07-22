import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const selectClassName =
  "w-full appearance-none rounded-full border-0 bg-[#F3F4F6] py-3.5 pe-12 ps-5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

export default async function AddUserPage() {
  const t = await getTranslations("Admin");

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
        {t("addUser.title")}
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">{t("addUser.subtitle")}</p>

      <form
        action="#"
        className="mt-8 space-y-5 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8"
      >
        <div>
          <label htmlFor="name" className={labelClassName}>
            {t("name")}
          </label>
          <input id="name" name="name" required className={inputClassName} />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="password" className={labelClassName}>
            {t("password")}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClassName}>
            {t("role")}
          </label>
          <div className="relative mt-2">
            <select
              id="role"
              name="role"
              className={selectClassName}
              defaultValue="USER"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 end-4 size-4 -translate-y-1/2 text-[#6B7280]"
              aria-hidden
              strokeWidth={2}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            {t("save")}
          </button>
          <Link
            href="/admin/users"
            className="rounded-full bg-[#F3F4F6] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
          >
            {t("cancel")}
          </Link>
        </div>
      </form>
    </div>
  );
}
