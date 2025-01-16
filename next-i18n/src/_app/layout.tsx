import { Metadata } from "next";
import { Link, useLocale, useTranslations } from "next-globe-gen";
import { ReactNode } from "react";
import "@/styles/globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: { template: "%s | Lokalise", default: "Lokalise" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const t = useTranslations();
  
  return (
    <html lang={locale}>
      <body>
        <header className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800">
          <LanguageSwitcher />
          <nav className="mt-4">
            <ul className="flex space-x-4">
            <li>
                <Link
                  href="/"
                  className="text-blue-500 hover:underline"
                  aria-current="page"
                >
                  {t("title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-blue-500 hover:underline"
                >
                  {t("dashboard.title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/markdown"
                  className="text-blue-500 hover:underline"
                >
                  {t("markdown.title")}
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
