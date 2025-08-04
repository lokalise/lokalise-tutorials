// src/translation-context.tsx
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { createTranslator, Translator } from '@/lib/i18n';

export type TranslationContextType = {
  lang: string;
  t: Translator;
};

// default fallback: identity-translator
const defaultContext: TranslationContextType = {
  lang: 'en',
  t: (key) => key,
};

export const TranslationContext = createContext<TranslationContextType>(defaultContext);

export function useTranslation(): TranslationContextType {
  return useContext(TranslationContext);
}

type TranslationProviderProps = {
  lang: string;
  messages: Record<string, string>;
  children: React.ReactNode;
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  lang,
  messages,
  children,
}) => {
  // build a cached translator instance anytime lang or messages change
  const t = useMemo(() => createTranslator(lang, messages), [lang, messages]);

  return (
    <TranslationContext.Provider value={{ lang, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
