import type { Metadata } from "next";
import { getTranslations, useTranslations } from "next-globe-gen";

export function generateMetadata(): Metadata {
  const t = getTranslations("dashboard");
  return { title: t("title") };
}

export default function Dashboard() {
  const t = useTranslations("dashboard");
  return (
    <section>
      <h1>{t("title")}</h1>
      <p>{t("projects", { count: 1, b: (children) => <b>{children}</b> })}</p>
    </section>
  );
}