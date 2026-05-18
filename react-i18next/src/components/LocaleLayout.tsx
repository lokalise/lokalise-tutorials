import { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
  fallbackLanguage,
  isSupportedLanguage,
  type LanguageCode,
} from '../i18n/languages';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MainNavigation } from './MainNavigation';

export function LocaleLayout() {
  const { lng } = useParams<{ lng: string }>();
  const { i18n } = useTranslation();

  const currentLanguage: LanguageCode | null = isSupportedLanguage(lng)
    ? lng
    : null;

  const [readyLanguage, setReadyLanguage] =
    useState<LanguageCode | null>(null);

  useEffect(() => {
    if (!currentLanguage) {
      return;
    }

    const language = currentLanguage;
    let cancelled = false;

    async function syncLanguage() {
      setReadyLanguage(null);

      await i18n.changeLanguage(language);

      if (cancelled) {
        return;
      }

      document.documentElement.lang = language;
      document.documentElement.dir = i18n.dir(language);

      setReadyLanguage(language);
    }

    void syncLanguage();

    return () => {
      cancelled = true;
    };
  }, [currentLanguage, i18n]);

  if (!currentLanguage) {
    return <Navigate to={`/${fallbackLanguage}/home`} replace />;
  }

  if (readyLanguage !== currentLanguage) {
    return <div>Loading translations...</div>;
  }

  return (
    <main>
      <LanguageSwitcher />
      <MainNavigation />

      <Outlet />
    </main>
  );
}