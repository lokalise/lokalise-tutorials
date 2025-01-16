import { useTranslations } from "next-globe-gen";

export default function NotFoundPage() {
  const t = useTranslations("notFound");
  return (
    <>
      <h1>
        {t("title")}
      </h1>
      <p>
        {t("description")}
      </p>
    </>
  );
}