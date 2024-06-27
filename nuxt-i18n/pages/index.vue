<template>
  <div class="container">
    <GlobalMenu />
    <h1>{{ $t('welcome') }}</h1>
    <p>{{ $t('message', { name: 'Lokalise' }) }}</p>
    <button @click="incrementCount">{{ $t('buttonPressed', { count: count }) }}</button>
    <p>{{ $t('currentDate', { date: $d(currentDate, 'short') }) }}</p>
    <p>{{ $t('deadline', { dateTime: $d(deadline, 'long') }) }}</p>
    <p>{{ $t('unitsPrice', { units: $n(2.56, 'decimal'), price: $n(1245, 'currency') }) }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GlobalMenu from '~/components/GlobalMenu.vue'

const { t, locale } = useI18n()

const count = ref(0)
const currentDate = new Date()
const deadline = new Date(currentDate)
deadline.setDate(currentDate.getDate() + 7)

const incrementCount = () => {
  count.value++
}

// Setting up localized meta tags
const metaTitle = computed(() => t('meta.title'))
const metaDescription = computed(() => t('meta.description'))

useHead({
  title: metaTitle.value,
  meta: [
    {
      name: 'description',
      content: metaDescription.value
    },
    {
      property: 'og:title',
      content: metaTitle.value
    },
    {
      property: 'og:description',
      content: metaDescription.value
    },
    {
      property: 'og:locale',
      content: locale.value
    }
  ]
})
</script>