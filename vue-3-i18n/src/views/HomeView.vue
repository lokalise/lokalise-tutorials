<template>
  <main>
    <h1>{{ t("home.header") }}</h1>
    <p>{{ t("home.created_by", {company: "Lokalise"}) }}</p>
    <p>{{ t("home.num_visits", 30) }}</p>
    <p>{{ d(new Date(), "longFormat") }}</p>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, d } = useI18n()
</script>