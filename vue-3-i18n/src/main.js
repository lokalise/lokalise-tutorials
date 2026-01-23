import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import I18nManager from "./i18n/manager";

const app = createApp(App);

I18nManager.init(i18n);

app.
  use(router).
  use(i18n);

await I18nManager.preload();

app.mount("#app");