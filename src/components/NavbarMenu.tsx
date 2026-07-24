"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { logoutAction } from "@/actions/auth";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import NavLink from "./NavLink";

type Props = {
  loggedIn: boolean;
  userName?: string | null;
  labels: {
    profile: string;
    addresses: string;
    login: string;
    logout: string;
    account: string;
  };
};

export default function NavbarMenu({ loggedIn, userName, labels }: Props) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={labels.account}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F6] py-2 pe-2.5 ps-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200 cursor-pointer"
      >
        <User className="size-4 shrink-0" aria-hidden />
        <ChevronDown
          className={`size-3.5 shrink-0 text-[#6B7280] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute end-0 top-[calc(100%+0.5rem)] z-50 w-56 origin-top-end rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        >
          {loggedIn ? (
            <>
              {userName ? (
                <p className="truncate px-3 py-2 text-xs font-medium text-[#6B7280]">
                  {userName}
                </p>
              ) : null}
              <NavLink
                href="/profile"
                exact
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F3F4F6]"
                activeClassName="bg-[#F3F4F6] font-semibold"
              >
                {labels.profile}
              </NavLink>
              <NavLink
                href="/addresses"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F3F4F6]"
                activeClassName="bg-[#F3F4F6] font-semibold"
              >
                {labels.addresses}
              </NavLink>
              <div className="my-1 border-t border-gray-100" />
              <div className="px-2 py-2">
                <LocaleSwitcher />
              </div>
              <div className="my-1 border-t border-gray-100" />
              <form action={logoutAction}>
                <button
                  type="submit"
                  role="menuitem"
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F3F4F6]"
                >
                  <LogOut className="size-4" aria-hidden />
                  {labels.logout}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#F3F4F6]"
              >
                {labels.login}
              </Link>
              <div className="my-1 border-t border-gray-100" />
              <div className="px-2 py-2">
                <LocaleSwitcher />
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
