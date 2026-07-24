import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
}

function redirectTo(path: string, nextUrl: URL) {
  return NextResponse.redirect(new URL(path, nextUrl.origin));
}

function redirectToLogin(nextUrl: URL) {
  const loginUrl = new URL("/login", nextUrl.origin);
  loginUrl.searchParams.set("callbackUrl", nextUrl.href);
  return NextResponse.redirect(loginUrl);
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const pathWithoutLocale = stripLocale(nextUrl.pathname);

      const isAdminLogin = pathWithoutLocale === "/admin/login";
      const isAdminPanel =
        pathWithoutLocale.startsWith("/admin") && !isAdminLogin;
      const isAuthPage =
        pathWithoutLocale === "/login" ||
        pathWithoutLocale === "/signup" ||
        pathWithoutLocale.startsWith("/login/") ||
        pathWithoutLocale.startsWith("/signup/");

      const isProtectedStore =
        pathWithoutLocale === "/profile" ||
        pathWithoutLocale === "/checkout" ||
        pathWithoutLocale.startsWith("/profile/") ||
        pathWithoutLocale.startsWith("/checkout/");

      if ((isAuthPage || isAdminLogin) && isLoggedIn) {
        return redirectTo(role === "ADMIN" ? "/admin" : "/", nextUrl);
      }

      if (isAdminLogin) {
        return true;
      }

      if (isAdminPanel) {
        if (!isLoggedIn) {
          return redirectToLogin(nextUrl);
        }

        if (isLoggedIn && role !== "ADMIN") {
          return redirectTo("/", nextUrl);
        }
      }


      if (isProtectedStore && !isLoggedIn) {
        return redirectToLogin(nextUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
