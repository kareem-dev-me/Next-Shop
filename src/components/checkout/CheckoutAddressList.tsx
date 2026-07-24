"use client";

import { useState } from "react";
import type { AddressRecord } from "@/utils/addresses";

type Props = {
  addresses: AddressRecord[];
  initialSelectedId: string;
  defaultLabel: string;
  legend: string;
};

export default function CheckoutAddressList({
  addresses,
  initialSelectedId,
  defaultLabel,
  legend,
}: Props) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  return (
    <fieldset className="mt-4 flex flex-col gap-3">
      <legend className="sr-only">{legend}</legend>
      {addresses.map((address) => {
        const selected = address.id === selectedId;
        return (
          <label
            key={address.id}
            className={`flex cursor-pointer gap-3 rounded-3xl border p-4 transition-colors ${
              selected
                ? "border-[#22C55E] bg-[#22C55E]/5"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="addressId"
              value={address.id}
              required
              checked={selected}
              onChange={() => setSelectedId(address.id)}
              className="mt-1 size-4 shrink-0 border-gray-300 text-[#22C55E] focus:ring-[#22C55E]"
            />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#1A1A1A]">
                  {address.line1}
                </span>
                {address.isDefault ? (
                  <span className="inline-flex rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-xs font-semibold text-[#16A34A]">
                    {defaultLabel}
                  </span>
                ) : null}
              </span>
              {address.line2 ? (
                <span className="mt-0.5 block text-sm text-[#6B7280]">
                  {address.line2}
                </span>
              ) : null}
              <span className="mt-1 block text-sm text-[#6B7280]">
                {[address.city, address.state, address.postalCode]
                  .filter(Boolean)
                  .join(", ")}
              </span>
              <span className="block text-sm text-[#6B7280]">
                {address.country}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
