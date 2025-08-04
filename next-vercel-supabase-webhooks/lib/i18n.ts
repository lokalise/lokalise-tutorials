// lib/i18n.ts
import IntlMessageFormat from 'intl-messageformat';

export type Messages = Record<string, string>;
export type Values = Record<string, string | number>;
export type Translator = (key: string, values?: Values) => string;

export function createTranslator(locale: string, messages: Messages): Translator {
  // Pre-compile all formatters up front
  const formatters: Record<string, IntlMessageFormat> = {};

  for (const [key, msg] of Object.entries(messages)) {
    try {
      formatters[key] = new IntlMessageFormat(msg, locale);
    } catch (err) {
      console.warn(
        `[i18n] Invalid message format for key "${key}" (${locale}):`,
        err
      );
      // leave key out of formatters so a missing-format fallbacks later
    }
  }

  return function t(key: string, values: Values = {}): string {
    const formatter = formatters[key];
    if (!formatter) {
      console.warn(`[i18n] Missing translation for key "${key}" (${locale})`);
      return key;
    }

    try {
      // .format() can return string or array for plural/select patterns; coerce to string
      const result = formatter.format(values);
      return Array.isArray(result) ? result.join('') : String(result);
    } catch (err) {
      console.error(
        `[i18n] Error formatting "${key}" with values`,
        values,
        err
      );
      return key;
    }
  };
}
