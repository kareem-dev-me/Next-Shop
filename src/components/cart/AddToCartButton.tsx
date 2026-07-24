"use client";

import { ArrowRight } from "lucide-react";
import { useFormStatus } from "react-dom";
import { addToCartAction } from "@/actions/cart";

type Props = {
  productId: string;
  stock: number;
  addLabel: string;
  outOfStockLabel: string;
};

function SubmitButton({
  disabled,
  addLabel,
  outOfStockLabel,
}: {
  disabled: boolean;
  addLabel: string;
  outOfStockLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
    >
      {disabled ? outOfStockLabel : addLabel}
      {!disabled ? (
        <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
      ) : null}
    </button>
  );
}

export default function AddToCartButton({
  productId,
  stock,
  addLabel,
  outOfStockLabel,
}: Props) {
  const outOfStock = stock <= 0;

  return (
    <form action={addToCartAction}>
      <input type="hidden" name="productId" value={productId} />
      <SubmitButton
        disabled={outOfStock}
        addLabel={addLabel}
        outOfStockLabel={outOfStockLabel}
      />
    </form>
  );
}
