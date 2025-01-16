"use client";

import {
  Link,
  useLocale,
  useRoute,
  useSchema,
  type RouteParams,
} from "next-globe-gen";
import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const activeLocale = useLocale();
  const schema = useSchema();
  const route = useRoute();
  const params = useParams<RouteParams<typeof route>>();

  return (
    <div className="flex gap-x-4">
      {schema.locales.map((locale) => (
        <Link
          key={locale}
          href={route}
          locale={locale}
          params={params}
          className={`px-3 py-2 rounded-md ${
            locale === activeLocale
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          aria-disabled={locale === activeLocale}
        >
          {locale === "en" && "English"}
          {locale === "fr" && "French"}
        </Link>
      ))}
    </div>
  );
}
