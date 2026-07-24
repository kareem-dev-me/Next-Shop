"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  updateProfileAction,
  type ProfileActionState,
} from "@/actions/profile";

const inputClassName =
  "mt-2 w-full rounded-full border-0 bg-[#F3F4F6] px-5 py-3.5 text-[#1A1A1A] outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

type Labels = {
  name: string;
  email: string;
  password: string;
  passwordHint: string;
  save: string;
  success: string;
};

type DefaultValues = {
  name?: string | null;
  email: string;
};

type Props = {
  labels: Labels;
  defaultValues: DefaultValues;
};

export default function ProfileForm({ labels, defaultValues }: Props) {
  const [state, formAction, pending] = useActionState<
    ProfileActionState,
    FormData
  >(updateProfileAction, null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.success && passwordRef.current) {
      passwordRef.current.value = "";
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <div>
        <label htmlFor="name" className={labelClassName}>
          {labels.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={defaultValues.name ?? ""}
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
          defaultValue={defaultValues.email}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClassName}>
          {labels.password}
        </label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className={inputClassName}
        />
        <p className="mt-2 text-xs text-[#6B7280]">{labels.passwordHint}</p>
      </div>

      {state?.error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}

      {state?.success ? (
        <p className="text-sm font-medium text-[#22C55E]" role="status">
          {labels.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-60 cursor-pointer"
      >
        {labels.save}
      </button>
    </form>
  );
}
