// lib/i18n-config.ts
const DEFAULT_LANG = (process.env.NEXT_PUBLIC_DEFAULT_LANG || 'en').toLowerCase();

const SUPPORTED_LANGS: readonly string[] = process.env.NEXT_PUBLIC_SUPPORTED_LANGS
  ? process.env.NEXT_PUBLIC_SUPPORTED_LANGS
      .split(',')
      .map((l) => l.trim().toLowerCase())
      .filter(Boolean)
  : ['en'];

if (!SUPPORTED_LANGS.includes(DEFAULT_LANG)) {
  throw new Error(
    `DEFAULT_LANG "${DEFAULT_LANG}" must be one of [${SUPPORTED_LANGS.join(', ')}]`
  );
}

export function getDefaultLang(): string {
  return DEFAULT_LANG;
}

export function getSupportedLangs(): readonly string[] {
  return SUPPORTED_LANGS;
}

export function isLangSupported(lang: string): boolean {
  return SUPPORTED_LANGS.includes(lang.toLowerCase());
}