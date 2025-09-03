<!-- .vitepress/theme/components/SkillCard.vue -->
<template>
  <div :class="['skill-card', { 'hover-enabled': hoverEffect }]">
    <div class="skill-header">
      <template v-if="img">
        <img :src="img" :alt="title" width="32" height="32" />
      </template>
      <template v-else>
        <component
          :is="lucideIcons[fallback] || DefaultIcon"
          class="lucide-icon"
        />
      </template>
      <strong>{{ title }}</strong>
    </div>
  </div>
</template>

<script setup>
import * as lucideIcons from 'lucide-vue-next'
const DefaultIcon = lucideIcons['Wrench']

defineProps({
  title: String,
  img: String,
  fallback: {
    type: String,
    default: ''
  },
  hoverEffect: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
@media (max-width: 600px) {
  .skill-card {
    width: 100% !important;
    height: auto !important;
    flex-wrap: wrap !important;
    align-items: flex-start !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }
}

.skill-card {
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
.skill-header {
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
}

.lucide-icon {
  width: 32px;
  height: 32px;
  color: #ccc;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
  transition: color 0.3s ease;
}
html:not(.dark) .lucide-icon {
  color: #333;
}
.skill-card.hover-enabled:hover .lucide-icon {
  color: #42b883;
}

/* light mode */
html:not(.dark) .skill-card {
  background-color: #f5f5f5;
  border-color: #ccc;
  background: linear-gradient(135deg, #f4f4f4, #eaeaea);
}

html:not(.dark) .skill-header {
  color: #222;
}
</style>