<template>
  <select @change="switchLanguage">
    <option
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
      :value="sLocale"
      :selected="locale === sLocale"
    >
      {{ t(`locale.${sLocale}`) }}
    </option>
  </select>
</template>

<script>
  import { useI18n } from 'vue-i18n'
  import { useRouter } from "vue-router"
  import Tr from "@/i18n/translation"

  export default {
    setup() {
      const { t, locale } = useI18n()

      const supportedLocales = Tr.supportedLocales

      const router = useRouter()

      const switchLanguage = async (event) => {
        const newLocale = event.target.value

        await Tr.switchLanguage(newLocale)

        try {
          await router.replace({ params: { locale: newLocale } })
        } catch(e) {
          console.log(e)
          router.push("/")
        }
      }

      return { t, locale, supportedLocales, switchLanguage }
    }
  }
</script>