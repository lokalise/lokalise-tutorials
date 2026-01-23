<template>
  <div>
    <h1>{{ t("about.header") }}</h1>

    <p>{{ t("about.donations", { donations: n(1456, "currencyFormat") }) }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, n } = useI18n()
</script>