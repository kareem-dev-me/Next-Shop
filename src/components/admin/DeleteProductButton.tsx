"use client";

import { Trash2 } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  deleteProductAction,
  type ProductActionState,
} from "@/actions/products";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type Props = {
  productId: string;
  label: string;
  confirmTitle: string;
  confirmMessage: string;
  confirmLabel: string;
  cancelLabel: string;
};

export default function DeleteProductButton({
  productId,
  label,
  confirmTitle,
  confirmMessage,
  confirmLabel,
  cancelLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<
    ProductActionState,
    FormData
  >(deleteProductAction, null);

  useEffect(() => {
    if (state?.error) {
      setOpen(false);
    }
  }, [state]);

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <form ref={formRef} action={formAction}>
        <input type="hidden" name="productId" value={productId} />
        <button
          type="button"
          disabled={pending}
          onClick={() => setOpen(true)}
          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-red-100 hover:text-red-700 disabled:opacity-60"
          aria-label={label}
        >
          <Trash2 className="size-4" aria-hidden />
        </button>
      </form>

      <ConfirmDialog
        open={open}
        title={confirmTitle}
        message={confirmMessage}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        pending={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          formRef.current?.requestSubmit();
        }}
      />

      {state?.error ? (
        <p
          className="max-w-40 text-end text-xs font-medium text-red-600"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
