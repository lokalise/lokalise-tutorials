<template>
  <div class="language-switcher">
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      @click="setLanguagePreference(locale.code)"
      :class="{ active: currentLocale === locale.code }"
    >
      {{ locale.name }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed, watch, onMounted } from 'vue'
import { useSwitchLocalePath } from '#imports'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const setLanguagePreference = (code) => {
  localStorage.setItem('preferredLanguage', code)
}

const currentLocale = computed(() => locale.value)

const updateDirAttribute = (newLocale) => {
  const currentLocale = locales.value.find(l => l.code === newLocale)
  document.documentElement.setAttribute('dir', currentLocale?.dir || 'ltr')
}

watch(locale, (newLocale) => {
  updateDirAttribute(newLocale)
})

onMounted(() => {
  const savedLanguage = localStorage.getItem('preferredLanguage')
  if (savedLanguage && locales.value.some(locale => locale.code === savedLanguage)) {
    locale.value = savedLanguage
  }

  updateDirAttribute(locale.value)
})
</script>
