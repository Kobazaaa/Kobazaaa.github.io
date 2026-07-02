<!-- .vitepress/theme/components/BadgeCard.vue -->
<template>
  <div class="card">
    <IconTitle :img="img" :fallback="fallback" :title="title" />
  </div>
</template>

<script setup>
import IconTitle from './IconTitle.vue'

defineProps({
  title: String,
  img: String,
  fallback: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
@media (max-width: 600px) {
  .card {
    width: 100% !important;
    height: auto !important;
    flex-wrap: wrap !important;
    align-items: flex-start !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }
}

.card {
  position: relative;
  border: 1px solid #444;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 16px;
  height: 64px;
  background-color: #2b2d2e;
  transition: background-color 0.3s, border-color 0.3s;

  background: linear-gradient(135deg, #252525, #373737);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.3);
}
/* light mode */
html:not(.dark) .card {
  background-color: #f5f5f5;
  border-color: #ccc;
  background: linear-gradient(135deg, #f4f4f4, #eaeaea);
}
</style>