import { getTranslations } from "next-globe-gen";
import { notFound } from "next/navigation";

export function generateMetadata() {
  const t = getTranslations();
  return { title: t("notFound.title") };
}

export default function CatchAllPage() {
  notFound();
}