import { arabicPlurals } from "./plurals"
import { datetimeFormats } from "./datetime"
import { numberFormats } from "./numbers"

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  pluralRules: {
    "ar": arabicPlurals,
  },
  datetimeFormats,
  numberFormats,
}))