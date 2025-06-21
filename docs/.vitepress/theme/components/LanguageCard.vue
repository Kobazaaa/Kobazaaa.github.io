<!-- .vitepress/theme/components/LanguageCard.vue -->
<template>
  <div class="language-card">
    <strong>{{ title }}</strong>
    <hr />
    <p>Speaking: {{ speaking }}</p>
    <p>Understanding: {{ understanding }}</p>
    <p>Writing: {{ writing }}</p>
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

<style scoped>
.language-card {
  border: 1px solid #444;
  border-radius: 10px;
  padding: 16px;
  width: 32.25%;
  background-color: #2b2d2e;
  color: #fff;
}

/* light mode */
html:not(.dark) .language-card {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  color: #111;
}
.language-card p {
  margin: 0;
}
</style>
