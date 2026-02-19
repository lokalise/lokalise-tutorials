// src/Root.tsx
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import App from "./App";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";
import {
  getDirection,
  getInitialLocale,
  loadMessages,
  storeLocale,
} from "./i18n/locales";

type LocaleState = {
  locale: string;
  messages: Record<string, string> | null;
  loading: boolean;
  error: string | null;
};

export function Root() {
  const [state, setState] = useState<LocaleState>(() => ({
    locale: getInitialLocale(),
    messages: null,
    loading: true,
    error: null,
  }));

  const { locale, messages, loading, error } = state;
  const dir = getDirection(locale);

  // Load messages whenever locale changes
  useEffect(() => {
    let cancelled = false;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    loadMessages(locale)
      .then((msgs) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          messages: msgs,
          loading: false,
          error: null,
        }));
        storeLocale(locale);
      })
      .catch((err) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : String(err),
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Keep <html> in sync
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dir;
  }, [locale, dir]);

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    setState((prev) => ({
      ...prev,
      locale: nextLocale,
    }));
  };

  if (loading || !messages) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>Loading translations…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>Failed to load translations: {error}</p>
      </div>
    );
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <div
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <LanguageSwitcher locale={locale} onChange={handleLocaleChange} />
        <App />
      </div>
    </IntlProvider>
  );
}
