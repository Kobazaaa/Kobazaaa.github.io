<!-- .vitepress/theme/components/InfoCard.vue -->
<template>
  <div class="info-card">
    <strong class="title">{{ title }}</strong>
    <p class="content"><slot>{{ content }}</slot></p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String
})
</script>

<style scoped>
.info-card {
  border-radius: 8px;
  padding: 16px;
  background-color: #41635485;
  color: #ddd;
  border-left: 4px solid #42b883;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  margin: 16px 0;
}

.info-card .title {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #42b883;
}

.info-card .content {
  font-size: 0.95rem;
  line-height: 1.5;
}

/* light mode */
html:not(.dark) .info-card {
  background-color: #92b9a73f;
  color: #111;
  border-left-color: #42b883;
}
</style>
