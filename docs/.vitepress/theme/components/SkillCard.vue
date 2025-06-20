<!-- .vitepress/theme/components/ProgrammingLanguageCard.vue -->
<template>
  <div style="border: 1px solid #444; border-radius: 10px; padding: 16px; height: 100%; width: 269px; background-color: #2b2d2e;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <img :src="img" :alt="title" width="32" />
      <strong>{{ title }}</strong>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  img: String,
  level: String
})
</script>
