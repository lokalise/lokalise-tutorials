import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['en', 'es', 'lv'],

  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',

    defaultNS: 'home',
    nsSeparator: ':',
    keySeparator: '.',
    contextSeparator: '_',
    pluralSeparator: '_',

    primaryLanguage: 'en',

    defaultValue: '',
    sort: true,
    indentation: 2,

    removeUnusedKeys: false,
    extractFromComments: false,
  },
});