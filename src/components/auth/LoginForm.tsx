"use client";

import { ArrowRight, Lock, Mail } from "lucide-react";
import { useActionState } from "react";
import { Link } from "@/i18n/navigation";
import {
  adminLoginAction,
  loginAction,
  type AuthActionState,
} from "@/actions/auth";

const inputClassName =
  "w-full rounded-full border-0 bg-[#F3F4F6] py-3.5 pe-5 ps-12 text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-shadow focus:ring-2 focus:ring-[#22C55E]/40";

const labelClassName = "block text-sm font-medium text-[#1A1A1A]";

const buttonClassName =
  "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 disabled:opacity-60";

const iconClassName =
  "pointer-events-none absolute top-1/2 start-4 size-4 -translate-y-1/2 text-gray-400";

type Labels = {
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  forgot?: string;
  submit: string;
  noAccount?: string;
  createAccount?: string;
};

type Props = {
  labels: Labels;
  mode?: "store" | "admin";
  redirectTo?: string;
};

export default function LoginForm({
  labels,
  mode = "store",
  redirectTo = "/",
}: Props) {
  const action = mode === "admin" ? adminLoginAction : loginAction;
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(action, null);

  return (
    <>
      <form action={formAction} className="mt-8 flex flex-col gap-5">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div>
          <label htmlFor="email" className={labelClassName}>
            {labels.email}
          </label>
          <div className="relative mt-2">
            <Mail className={iconClassName} aria-hidden />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={labels.emailPlaceholder}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="password" className={labelClassName}>
              {labels.password}
            </label>
            {labels.forgot ? (
              <Link
                href="#"
                className="text-sm font-medium text-[#22C55E] hover:text-green-600"
              >
                {labels.forgot}
              </Link>
            ) : null}
          </div>
          <div className="relative mt-2">
            <Lock className={iconClassName} aria-hidden />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder={labels.passwordPlaceholder}
              className={inputClassName}
            />
          </div>
        </div>

        {state?.error ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {state.error}
          </p>
        ) : null}

        <button type="submit" disabled={pending} className={buttonClassName}>
          {labels.submit}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
        </button>
      </form>

      {labels.noAccount && labels.createAccount ? (
        <p className="mt-8 text-center text-sm text-[#6B7280]">
          {labels.noAccount}{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#22C55E] hover:text-green-600"
          >
            {labels.createAccount}
          </Link>
        </p>
      ) : null}
    </>
  );
}
