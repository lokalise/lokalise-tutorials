// src/i18n/locales.ts
const STORAGE_KEY = 'app-locale'

const messageModules = import.meta.glob('./messages/*.json')

type Messages = Record<string, string>

export async function loadMessages(locale: string): Promise<Messages> {
  const key = `./messages/${locale}.json`
  const loader = messageModules[key]

  if (!loader) {
    throw new Error(`No messages found for locale "${locale}"`)
  }

  const mod = (await loader()) as { default: Messages }
  return mod.default
}

// Discover supported locales from file names
const localeFromPathRegex = /\.\/messages\/([a-z0-9-]+)\.json$/i

export const supportedLocales: string[] = Object.keys(messageModules)
  .map((path) => {
    const match = path.match(localeFromPathRegex)
    return match ? match[1] : null
  })
  .filter((v): v is string => Boolean(v))
  .sort()

export const defaultLocale =
  supportedLocales.includes('en') ? 'en' : supportedLocales[0] ?? 'en'

export function getDirection(locale: string): 'ltr' | 'rtl' {
  const normalized = locale.toLowerCase()
  if (normalized.startsWith('ar')) return 'rtl'
  return 'ltr'
}

export function detectUserLocale(): string {
  const browserLocales =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language]

  for (const raw of browserLocales) {
    const base = normalizeLocale(raw)
    if (supportedLocales.includes(base)) {
      return base
    }
  }

  return defaultLocale
}

function normalizeLocale(locale: string): string {
  return locale.toLowerCase().split('-')[0]
}

export function loadStoredLocale(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function storeLocale(locale: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // ignore storage errors (private mode, disabled cookies, etc.)
  }
}

export function getInitialLocale(): string {
  // 1. User preference (if valid)
  const saved = loadStoredLocale()
  if (saved && supportedLocales.includes(saved)) {
    return saved
  }

  // 2. Browser preference
  const detected = detectUserLocale()
  if (supportedLocales.includes(detected)) {
    return detected
  }

  // 3. Hard fallback
  return defaultLocale
}