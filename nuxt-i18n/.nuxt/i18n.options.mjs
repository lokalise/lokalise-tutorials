
// @ts-nocheck


export const localeCodes =  [
  "en",
  "fr",
  "ar"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => import("../locales/en.json" /* webpackChunkName: "locale_E_58_E_58_lokalise_lokalisenuxti18n_locales_en_json" */), cache: true }],
  "fr": [{ key: "../locales/fr.ts", load: () => import("../locales/fr.ts?hash=a30450c7&locale=fr" /* webpackChunkName: "locale_E_58_E_58_lokalise_lokalisenuxti18n_locales_fr_ts" */), cache: false }],
  "ar": [{ key: "../locales/ar.json", load: () => import("../locales/ar.json" /* webpackChunkName: "locale_E_58_E_58_lokalise_lokalisenuxti18n_locales_ar_json" */), cache: true }]
}

export const vueI18nConfigs = [
  () => import("../i18n/i18n.config.ts?hash=5b32d2e0&config=1" /* webpackChunkName: "__i18n_i18n_config_ts_5b32d2e0" */)
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "./i18n/i18n.config.ts",
  "locales": [
    {
      "code": "en",
      "iso": "en-US",
      "name": "English",
      "files": [
        "locales/en.json"
      ]
    },
    {
      "code": "fr",
      "iso": "fr-FR",
      "name": "Français",
      "files": [
        "locales/fr.ts"
      ]
    },
    {
      "code": "ar",
      "iso": "ar-AR",
      "name": "العربية",
      "dir": "rtl",
      "files": [
        "locales/ar.json"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": true,
  "langDir": "locales/",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "iso": "en-US",
    "name": "English",
    "files": [
      {
        "path": "locales/en.json"
      }
    ]
  },
  {
    "code": "fr",
    "iso": "fr-FR",
    "name": "Français",
    "files": [
      {
        "path": "locales/fr.ts"
      }
    ]
  },
  {
    "code": "ar",
    "iso": "ar-AR",
    "name": "العربية",
    "dir": "rtl",
    "files": [
      {
        "path": "locales/ar.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
