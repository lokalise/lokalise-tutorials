<template>
  <div class="container">
    <GlobalMenu />
    <h1>{{ $t('aboutTitle') }}</h1>
    <p>{{ $t('aboutDescription') }}</p>
  </div>
</template>

<script setup>
import GlobalMenu from '~/components/GlobalMenu.vue'
</script>
