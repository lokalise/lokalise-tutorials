<template>
  <select :value="locale" @change="switchLanguage($event.target.value)">
    <option
      v-for="code in supportedLocales"
      :key="`locale-${code}`"
      :value="code"
    >
      {{ t(`locale.${code}`) }}
    </option>
  </select>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import I18nManager from "@/i18n/manager";

const { t, locale } = useI18n();

const supportedLocales = I18nManager.supportedLocales;

const router = useRouter();

const switchLanguage = async (newLocale) => {
  const resolved = I18nManager.resolveLocale(newLocale);

  if (!resolved) {
    console.warn("Unsupported locale:", newLocale);
    return;
  }

  if (resolved === I18nManager.currentLocale) return;

  await I18nManager.setLocale(resolved);

  await router.replace({
    name: router.currentRoute.value.name,
    params: {
      ...router.currentRoute.value.params,
      locale: resolved,
    },
    query: router.currentRoute.value.query,
    hash: router.currentRoute.value.hash,
  });
};
</script>
