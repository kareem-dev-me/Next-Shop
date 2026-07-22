"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/actions/auth";

export default function LogoutButton({ label }: { label: string }) {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-[#F3F4F6] px-3.5 py-2 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-gray-200"
      >
        <span className="hidden sm:inline">{label}</span>
        <LogOut className="size-4" aria-hidden />
      </button>
    </form>
  );
}
