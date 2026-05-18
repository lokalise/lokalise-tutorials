export const languages = [
  {
    code: 'en',
    label: 'English',
    dir: 'ltr',
  },
  {
    code: 'lv',
    label: 'Latviski',
    dir: 'ltr',
  },
  {
    code: 'es',
    label: 'Español',
    dir: 'ltr',
  },

  // Example RTL language:
  {
    code: 'he',
    label: 'עברית',
    dir: 'rtl',
  },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];

export const supportedLanguages = languages.map((language) => language.code);

export const fallbackLanguage: LanguageCode = 'en';

export function isSupportedLanguage(
  language: string | undefined,
): language is LanguageCode {
  return languages.some((item) => item.code === language);
}