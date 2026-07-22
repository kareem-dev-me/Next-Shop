import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const pathWithoutLocale = pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";

      const isAdminLogin = pathWithoutLocale === "/admin/login";
      const isAdminPanel =
        pathWithoutLocale.startsWith("/admin") && !isAdminLogin;
      const isProtectedStore =
        pathWithoutLocale === "/profile" ||
        pathWithoutLocale === "/checkout" ||
        pathWithoutLocale.startsWith("/profile/") ||
        pathWithoutLocale.startsWith("/checkout/");

      if (isAdminLogin) {
        return true;
      }

      if (isAdminPanel) {
        return isLoggedIn && role === "ADMIN";
      }

      if (isProtectedStore) {
        return isLoggedIn;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
