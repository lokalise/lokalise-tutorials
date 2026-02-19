// src/i18n/LanguageSwitcher.tsx
import type React from "react";
import { supportedLocales } from "./locales";

const labels: Record<string, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  // fallback: show locale code if not listed here
};

type LanguageSwitcherProps = {
  locale: string;
  onChange: (locale: string) => void;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  locale,
  onChange,
}) => {
  if (supportedLocales.length <= 1) {
    // No point showing a switcher if there is only one locale
    return null;
  }

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
      {supportedLocales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          disabled={code === locale}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: 4,
            border: "1px solid #ccc",
            opacity: code === locale ? 0.7 : 1,
            cursor: code === locale ? "default" : "pointer",
          }}
        >
          {labels[code] ?? code}
        </button>
      ))}
    </div>
  );
};
