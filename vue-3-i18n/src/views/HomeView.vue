<template>
  <main>
    <h1>{{ $t("home.header") }}</h1>
    <p>{{ $t("home.created_by", {company: "Lokalise"}) }}</p>
    <p>{{ $t("home.num_visits", 1) }}</p>
    <p>{{ $d(new Date(), "longFormat") }}</p>
  </main>
</template>