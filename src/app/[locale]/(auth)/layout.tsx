import { getTranslations } from "next-intl/server";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-auth",
  weight: ["400", "500", "600", "700", "800"],
});

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations("Common");

  return (
    <div
      className={`${jakarta.variable} relative flex min-h-screen items-center justify-center bg-white px-6 py-12 font-(family-name:--font-auth)`}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-gray-200"
      >
        <defs>
          <pattern
            id="auth-waves"
            width="120"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 Q30 5 60 20 T120 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.45"
            />
            <path
              d="M0 32 Q30 17 60 32 T120 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-waves)" />
      </svg>

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/icon.png"
            alt=""
            width={36}
            height={36}
            className="h-auto w-auto"
          />
          <span className="text-2xl font-extrabold tracking-tight text-[#1A1A1A]">
            {t("brand")}
          </span>
        </Link>

        <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
