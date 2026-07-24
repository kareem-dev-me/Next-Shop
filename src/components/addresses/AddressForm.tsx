"use client";

import { useActionState } from "react";
import { Link } from "@/i18n/navigation";
import {
  createAddressAction,
  updateAddressAction,
  type AddressActionState,
} from "@/actions/addresses";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

type Labels = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: string;
  save: string;
  cancel: string;
};

type DefaultValues = {
  line1?: string;
  line2?: string | null;
  city?: string;
  state?: string | null;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
};

type Props = {
  mode: "create" | "edit";
  addressId?: string;
  labels: Labels;
  defaultValues?: DefaultValues;
};

export default function AddressForm({
  mode,
  addressId,
  labels,
  defaultValues,
}: Props) {
  const action = mode === "edit" ? updateAddressAction : createAddressAction;
  const [state, formAction, pending] = useActionState<
    AddressActionState,
    FormData
  >(action, null);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      {mode === "edit" && addressId ? (
        <input type="hidden" name="addressId" value={addressId} />
      ) : null}

      <div>
        <label htmlFor="line1" className={labelClassName}>
          {labels.line1}
        </label>
        <input
          id="line1"
          name="line1"
          type="text"
          required
          autoComplete="address-line1"
          defaultValue={defaultValues?.line1 ?? ""}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="line2" className={labelClassName}>
          {labels.line2}
        </label>
        <input
          id="line2"
          name="line2"
          type="text"
          autoComplete="address-line2"
          defaultValue={defaultValues?.line2 ?? ""}
          className={inputClassName}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClassName}>
            {labels.city}
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            defaultValue={defaultValues?.city ?? ""}
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="state" className={labelClassName}>
            {labels.state}
          </label>
          <input
            id="state"
            name="state"
            type="text"
            autoComplete="address-level1"
            defaultValue={defaultValues?.state ?? ""}
            className={inputClassName}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="postalCode" className={labelClassName}>
            {labels.postalCode}
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            required
            autoComplete="postal-code"
            defaultValue={defaultValues?.postalCode ?? ""}
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="country" className={labelClassName}>
            {labels.country}
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            defaultValue={defaultValues?.country ?? ""}
            className={inputClassName}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1A1A1A]">
        <input
          type="checkbox"
          name="isDefault"
          defaultChecked={defaultValues?.isDefault ?? false}
          className="size-4 rounded border-gray-300 text-[#22C55E] focus:ring-[#22C55E]"
        />
        {labels.isDefault}
      </label>

      {state?.error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="mt-2 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-60 cursor-pointer"
        >
          {labels.save}
        </button>
        <Link
          href="/addresses"
          className="inline-flex items-center justify-center rounded-full bg-[#F3F4F6] px-5 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
        >
          {labels.cancel}
        </Link>
      </div>
    </form>
  );
}
