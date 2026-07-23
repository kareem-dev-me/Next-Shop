"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";

type Props = ComponentProps<typeof Link> & {
  href: string;
  exact?: boolean;
  className?: string;
  activeClassName?: string;
};

function isActivePath(pathname: string, href: string, exact: boolean) {
  if (exact || href === "/admin") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLink({
  href,
  exact = false,
  className = "",
  activeClassName = "",
  children,
  ...props
}: Props) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href, exact);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={active ? `${className} ${activeClassName}`.trim() : className}
      {...props}
    >
      {children}
    </Link>
  );
}
