<!-- .vitepress/theme/components/SkillCard.vue -->
<template>
  <div class="skill-card">
    <div class="skill-header">
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

<style scoped>
.skill-card {
  border: 1px solid #444;
  border-radius: 10px;
  padding: 16px;
  height: 100%;
  width: 23.75%;
  background-color: #2b2d2e;
  transition: background-color 0.3s, border-color 0.3s;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
}

/* light mode */
html:not(.dark) .skill-card {
  background-color: #f5f5f5;
  border-color: #ccc;
}
html:not(.dark) .skill-header {
  color: #222;
}
</style>
