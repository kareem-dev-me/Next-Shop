import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { loginSchema } from "@/schemas/auth";

const authorize = async (
  credentials: Partial<Record<"email" | "password", unknown>>,
  isAdmin: boolean,
) => {
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) {
    return null;
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null;
  }

  if (isAdmin) {
    if (user.role !== "ADMIN") {
      return null;
    }
  } else if (user.role !== "USER") {
    return null;
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "user-signin",
      name: "User Sign In",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return await authorize(credentials, false);
      },
    }),
    Credentials({
      id: "admin-signin",
      name: "Admin Sign In",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return await authorize(credentials, true);
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
});
