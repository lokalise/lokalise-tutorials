<template>
  <nav class="global-menu">
    <NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink>
    <NuxtLink :to="localePath('/about')">{{ $t('about') }}</NuxtLink>
  </nav>
</template>

<script setup>
import { useLocalePath } from '#imports'

const localePath = useLocalePath()
</script>