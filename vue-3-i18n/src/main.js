import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"

createApp(App).
  use(router).
  use(i18n).
  mount('#app')