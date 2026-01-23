import { nextTick } from "vue";

const localeModules = import.meta.glob('./locales/*.json');
let supportedLocalesCache = null;
let _i18n = null;
const loadedLocales = new Set();
const loadingPromises = new Map();

const I18nManager = {
  init(i18nInstance) {
    if (!i18nInstance?.global?.locale) {
      throw new Error("I18nManager.init: invalid i18n instance");
    }
    _i18n = i18nInstance;
  },

  async preload() {
    const seg = window.location.pathname.split('/');
    const urlLocale = seg[1] || null;

    const initialLocale =
      (urlLocale ? this.resolveLocale(urlLocale) : null) ||
      this.getPersistedLocale() ||
      this.defaultLocale;

    await this.setLocale(initialLocale);
  },

  get currentLocale() {
    return _i18n?.global?.locale?.value || this.guessDefaultLocale();
  },

  async loadLocaleMessages(locale) {
    if (!_i18n) throw new Error("I18nManager.loadLocaleMessages called before init");

    if (loadedLocales.has(locale)) return;
    if (loadingPromises.has(locale)) return loadingPromises.get(locale);

    const key = `./locales/${locale}.json`;
    const loader = localeModules[key];
    if (!loader) throw new Error(`Locale file not found: ${locale}`);

    const p = (async () => {
      const messages = (await loader()).default;
      _i18n.global.setLocaleMessage(locale, messages);
      loadedLocales.add(locale);
      await nextTick();
    })().finally(() => loadingPromises.delete(locale));

    loadingPromises.set(locale, p);
    return p;
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        ...(to?.params || {}),
        locale: this.currentLocale,
      },
    };
  },

  get supportedLocales() {
    if (supportedLocalesCache) return supportedLocalesCache;

    supportedLocalesCache = Object.keys(localeModules)
      .map(file => file.match(/\.\/locales\/([^/]+)\.json$/)?.[1])
      .filter(Boolean);

    return supportedLocalesCache;
  },

  get defaultLocale() {
    return this.normalizeLocale(import.meta.env.VITE_DEFAULT_LOCALE || "en");
  },

  async setLocale(newLocale) {
    if (!_i18n) throw new Error("I18nManager.setLocale called before init");

    const current = _i18n.global.locale.value;

    await this.loadLocaleMessages(newLocale);

    if (current !== newLocale) {
      _i18n.global.locale.value = newLocale;
    }

    document.documentElement.lang = newLocale;
    localStorage.setItem("user-locale", newLocale);
  },

  isLocaleSupported(locale) {
    const normalized = this.normalizeLocale(locale);
    return !!normalized && this.supportedLocales.includes(normalized);
  },

  resolveLocale(locale) {
    const normalized = this.normalizeLocale(locale);
    if (!normalized) return null;

    if (this.isLocaleSupported(normalized)) return normalized;

    const base = normalized.split('_')[0];
    if (this.isLocaleSupported(base)) return base;

    return null;
  },

  getUserLocale() {
    const raw =
      window.navigator.language ||
      window.navigator.userLanguage ||
      this.defaultLocale;

    const normalized = this.normalizeLocale(raw);

    return {
      locale: normalized,                // en_us
      localeNoRegion: normalized.split('_')[0] // en
    };
  },

  getPersistedLocale() {
    const stored = localStorage.getItem("user-locale");
    const normalized = this.normalizeLocale(stored);
    return this.isLocaleSupported(normalized) ? normalized : null;
  },

  guessDefaultLocale() {
    const saved = this.getPersistedLocale();
    if (saved) return saved;

    const pref = this.getUserLocale();

    const resolved =
      this.resolveLocale(pref.locale) ||
      this.resolveLocale(pref.localeNoRegion);

    return resolved || this.defaultLocale;
  },

  normalizeLocale(locale) {
    if (!locale) return null;

    return locale
      .toLowerCase()
      .replace('-', '_')
      .replace(/\s+/g, '');
  },

  async routeMiddleware(to) {
    const raw = to.params.locale;
    const fallback = this.guessDefaultLocale();

    const resolved = raw ? this.resolveLocale(raw) : null;

    if (!resolved) {
      return {
        name: to.name,
        params: { ...to.params, locale: fallback },
        query: to.query,
        hash: to.hash,
      };
    }

    if (this.normalizeLocale(raw) !== resolved) {
      return {
        name: to.name,
        params: { ...to.params, locale: resolved },
        query: to.query,
        hash: to.hash,
      };
    }

    this.setLocale(resolved);
    return true;
  },
};

export default I18nManager;