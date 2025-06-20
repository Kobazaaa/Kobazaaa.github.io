<!-- .vitepress/theme/components/LanguageCard.vue -->
<template>
  <div style="border: 1px solid #444; border-radius: 10px; padding: 16px; width: 365px; background-color: #2b2d2e;">
    <strong>{{ title }}</strong><hr />
    <p style="margin: 0;">Speaking: {{ speaking }}</p>
    <p style="margin: 0;">Understanding: {{ understanding }}</p>
    <p style="margin: 0;">Writing: {{ writing }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  img: String,
  speaking: String,
  understanding: String,
  writing: String
})
</script>
