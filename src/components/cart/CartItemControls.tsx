"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import {
  removeCartItemAction,
  updateCartItemAction,
} from "@/actions/cart";

type Props = {
  productId: string;
  quantity: number;
  maxStock: number;
  labels: {
    qty: string;
    increase: string;
    decrease: string;
    remove: string;
  };
};

function IconButton({
  label,
  children,
  disabled = false,
}: {
  label: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-label={label}
      disabled={disabled || pending}
      className="inline-flex size-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
    >
      {children}
    </button>
  );
}

export default function CartItemControls({
  productId,
  quantity,
  maxStock,
  labels,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <form action={updateCartItemAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity - 1} />
        <IconButton label={labels.decrease}>
          <Minus className="size-3.5" aria-hidden />
        </IconButton>
      </form>

      <span className="min-w-8 text-center text-sm font-semibold text-[#1A1A1A]">
        {quantity}
      </span>

      <form action={updateCartItemAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity + 1} />
        <IconButton label={labels.increase} disabled={quantity >= maxStock}>
          <Plus className="size-3.5" aria-hidden />
        </IconButton>
      </form>

      <form action={removeCartItemAction} className="ms-1">
        <input type="hidden" name="productId" value={productId} />
        <IconButton label={labels.remove}>
          <Trash2 className="size-3.5" aria-hidden />
        </IconButton>
      </form>
    </div>
  );
}
