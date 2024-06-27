import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/style.scss'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.ts' },
      { code: 'ar', iso: 'ar-AR', name: 'العربية', file: 'ar.json', dir: 'rtl' }
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    langDir: 'locales/',
    lazy: true,
    vueI18n: './i18n/i18n.config.ts'
  },
})