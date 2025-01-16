import type { Metadata } from "next";
import { getTranslations, useTranslations, useLocale } from "next-globe-gen";

export function generateMetadata(): Metadata {
  const t = getTranslations();
  return {
    title: t("title"),
    description: t("description", { company: "Lokalise" }),
  };
}

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(now);

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <section
        aria-labelledby="main-title"
        className="text-center p-8 max-w-2xl"
      >
        <h1
          id="main-title"
          className="text-4xl font-bold text-gray-900 dark:text-gray-100"
        >
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          {t("description", { company: "Lokalise" })}
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t("currentTime", { time: formattedDate })}
        </p>
      </section>
    </main>
  );
}