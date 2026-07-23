import { Pencil, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import { Link } from "@/i18n/navigation";
import { getUsersPage } from "@/utils/users";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminUsersPage({ searchParams }: Props) {
  const t = await getTranslations("Admin");
  const { page: pageParam } = await searchParams;
  const { users, pagination } = await getUsersPage(pageParam);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
            {t("usersPage.title")}
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">{t("usersPage.subtitle")}</p>
        </div>
        <Link
          href="/admin/users/add-user"
          className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          <Plus className="size-4" aria-hidden />
          {t("usersPage.add")}
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-100 bg-white">
        {users.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-[#6B7280]">
            {t("usersPage.empty")}
          </p>
        ) : (
          <table className="w-full min-w-[560px] text-start text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-[#6B7280]">
                <th className="px-5 py-4 font-medium">{t("name")}</th>
                <th className="px-5 py-4 font-medium">{t("email")}</th>
                <th className="px-5 py-4 font-medium">{t("role")}</th>
                <th className="px-5 py-4 font-medium">
                  <span className="sr-only">{t("edit")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 text-[#1A1A1A] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {user.name || "—"}
                  </td>
                  <td className="px-5 py-4 text-[#6B7280]">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-semibold text-[#6B7280]">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="inline-flex size-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-gray-200"
                        aria-label={t("edit")}
                      >
                        <Pencil className="size-4" aria-hidden />
                      </Link>
                      <DeleteUserButton
                        userId={user.id}
                        label={t("delete")}
                        confirmTitle={t("delete")}
                        confirmMessage={t("usersPage.deleteConfirm")}
                        confirmLabel={t("delete")}
                        cancelLabel={t("cancel")}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pagination.totalCount > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#6B7280]">
            {t("usersPage.pageOf", {
              current: pagination.page,
              total: pagination.totalPages,
            })}
          </p>
          <div className="flex items-center gap-2">
            {pagination.hasPrev ? (
              <Link
                href={`/admin/users?page=${pagination.page - 1}`}
                className="rounded-full bg-[#F3F4F6] px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
              >
                {t("usersPage.previous")}
              </Link>
            ) : (
              <span className="rounded-full bg-[#F3F4F6] px-4 py-2 text-sm font-semibold text-[#1A1A1A] opacity-40">
                {t("usersPage.previous")}
              </span>
            )}
            {pagination.hasNext ? (
              <Link
                href={`/admin/users?page=${pagination.page + 1}`}
                className="rounded-full bg-[#F3F4F6] px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
              >
                {t("usersPage.next")}
              </Link>
            ) : (
              <span className="rounded-full bg-[#F3F4F6] px-4 py-2 text-sm font-semibold text-[#1A1A1A] opacity-40">
                {t("usersPage.next")}
              </span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
