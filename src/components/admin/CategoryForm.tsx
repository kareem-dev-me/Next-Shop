"use client";

import { useActionState } from "react";
import { Link } from "@/i18n/navigation";
import {
  createCategoryAction,
  updateCategoryAction,
  type CategoryActionState,
} from "@/actions/categories";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

type Labels = {
  name: string;
  slug: string;
  description: string;
  save: string;
  cancel: string;
};

type DefaultValues = {
  name?: string;
  slug?: string;
  description?: string | null;
};

type Props = {
  mode: "create" | "edit";
  categoryId?: string;
  labels: Labels;
  defaultValues?: DefaultValues;
};

export default function CategoryForm({
  mode,
  categoryId,
  labels,
  defaultValues,
}: Props) {
  const action = mode === "edit" ? updateCategoryAction : createCategoryAction;
  const [state, formAction, pending] = useActionState<
    CategoryActionState,
    FormData
  >(action, null);

  return (
    <form
      action={formAction}
      className="mt-8 space-y-5 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8"
    >
      {mode === "edit" && categoryId ? (
        <input type="hidden" name="categoryId" value={categoryId} />
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
        <label htmlFor="slug" className={labelClassName}>
          {labels.slug}
        </label>
        <input
          id="slug"
          name="slug"
          required
          defaultValue={defaultValues?.slug ?? ""}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClassName}>
          {labels.description}
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={defaultValues?.description ?? ""}
          className="mt-2 w-full rounded-3xl border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40"
        />
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
          href="/admin/categories"
          className="rounded-full bg-[#F3F4F6] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
        >
          {labels.cancel}
        </Link>
      </div>
    </form>
  );
}
