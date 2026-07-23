"use client";

import { useActionState } from "react";
import { Link } from "@/i18n/navigation";
import {
  createUserAction,
  updateUserAction,
  type UserActionState,
} from "@/actions/users";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

type Labels = {
  name: string;
  email: string;
  password: string;
  role: string;
  passwordHint?: string;
  save: string;
  cancel: string;
};

type DefaultValues = {
  name?: string | null;
  email?: string;
};

type Props = {
  mode: "create" | "edit";
  userId?: string;
  labels: Labels;
  defaultValues?: DefaultValues;
};

export default function UserForm({
  mode,
  userId,
  labels,
  defaultValues,
}: Props) {
  const action = mode === "edit" ? updateUserAction : createUserAction;
  const [state, formAction, pending] = useActionState<
    UserActionState,
    FormData
  >(action, null);

  return (
    <form
      action={formAction}
      className="mt-8 space-y-5 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8"
    >
      {mode === "edit" && userId ? (
        <input type="hidden" name="userId" value={userId} />
      ) : null}

      <div>
        <label htmlFor="name" className={labelClassName}>
          {labels.name}
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name ?? ""}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClassName}>
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={defaultValues?.email ?? ""}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClassName}>
          {labels.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required={mode === "create"}
          autoComplete="new-password"
          minLength={mode === "create" ? 8 : undefined}
          className={inputClassName}
        />
        {mode === "edit" && labels.passwordHint ? (
          <p className="mt-2 text-xs text-[#6B7280]">{labels.passwordHint}</p>
        ) : null}
      </div>

      <div>
        <span className={labelClassName}>{labels.role}</span>
        <p className="mt-2">
          <span className="inline-flex rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-semibold text-[#6B7280]">
            ADMIN
          </span>
        </p>
      </div>

      {state?.error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {labels.save}
        </button>
        <Link
          href="/admin/users"
          className="rounded-full bg-[#F3F4F6] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
        >
          {labels.cancel}
        </Link>
      </div>
    </form>
  );
}
