<template>
  <nav>
    <ul>
      <li>
        <RouterLink :to="I18nManager.i18nRoute({ name: 'home' })">{{ t("nav.home") }}</RouterLink>
      </li>

      <li>
        <RouterLink :to="I18nManager.i18nRoute({ name: 'about' })">{{ t("nav.about") }}</RouterLink>
      </li>
    </ul>
  </nav>

  <LanguageSwitcher></LanguageSwitcher>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import I18nManager from "@/i18n/manager"

const { t } = useI18n();
</script>
