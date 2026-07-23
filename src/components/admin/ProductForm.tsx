"use client";

import { ChevronDown } from "lucide-react";
import { useActionState } from "react";
import { Link } from "@/i18n/navigation";
import {
  createProductAction,
  updateProductAction,
  type ProductActionState,
} from "@/actions/products";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const selectClassName =
  "w-full appearance-none rounded-full border-0 bg-[#F3F4F6] py-3.5 pe-12 ps-5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

type CategoryOption = {
  id: string;
  name: string;
};

type Labels = {
  name: string;
  slug: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image: string;
  imagePlaceholder: string;
  selectCategory: string;
  noCategories: string;
  save: string;
  cancel: string;
};

type DefaultValues = {
  name?: string;
  slug?: string;
  categoryId?: string;
  price?: number;
  stock?: number;
  description?: string | null;
  image?: string | null;
};

type Props = {
  mode: "create" | "edit";
  productId?: string;
  categories: CategoryOption[];
  labels: Labels;
  defaultValues?: DefaultValues;
};

export default function ProductForm({
  mode,
  productId,
  categories,
  labels,
  defaultValues,
}: Props) {
  const action = mode === "edit" ? updateProductAction : createProductAction;
  const [state, formAction, pending] = useActionState<
    ProductActionState,
    FormData
  >(action, null);

  if (categories.length === 0) {
    return (
      <p className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 text-sm text-[#6B7280] sm:p-8">
        {labels.noCategories}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="mt-8 space-y-5 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8"
    >
      {mode === "edit" && productId ? (
        <input type="hidden" name="productId" value={productId} />
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
        <label htmlFor="categoryId" className={labelClassName}>
          {labels.category}
        </label>
        <div className="relative mt-2">
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={defaultValues?.categoryId ?? ""}
            className={selectClassName}
          >
            <option value="" disabled>
              {labels.selectCategory}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 end-4 size-4 -translate-y-1/2 text-[#6B7280]"
            aria-hidden
            strokeWidth={2}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className={labelClassName}>
            {labels.price}
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues?.price ?? ""}
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="stock" className={labelClassName}>
            {labels.stock}
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={defaultValues?.stock ?? ""}
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className={labelClassName}>
          {labels.image}
        </label>
        <input
          id="image"
          name="image"
          type="url"
          placeholder={labels.imagePlaceholder}
          defaultValue={defaultValues?.image ?? ""}
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
          href="/admin/products"
          className="rounded-full bg-[#F3F4F6] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
        >
          {labels.cancel}
        </Link>
      </div>
    </form>
  );
}
