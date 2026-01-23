import { createI18n } from "vue-i18n";
import pluralRules from "./rules/plurals"
import numberFormats from "./rules/numbers.js"
import datetimeFormats from "./rules/datetime.js"

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  pluralRules,
  numberFormats,
  datetimeFormats,
})