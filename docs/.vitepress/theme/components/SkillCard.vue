<!-- .vitepress/theme/components/SkillCard.vue -->
<template>
  <div class="skill-card"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave">
    <div class="skill-header">
    <IconTitle :img="img" :fallback="fallback" :title="title" />
    </div>
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

const onMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  card.style.setProperty('--mx', `${x}%`)
  card.style.setProperty('--my', `${y}%`)
}

const onMouseLeave = (e) => {
  const card = e.currentTarget
  card.style.removeProperty('--mx')
  card.style.removeProperty('--my')
}
</script>

<style scoped>
@media (max-width: 640px) {
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
  background: radial-gradient(
    circle at var(--mx, 100%) var(--my, 100%),
    #3a3a3a,
    #2b2d2e
  );
  transition:
    border-color 0.3s,
    transform 0.3s,
    box-shadow 0.3s;
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

.skill-card:hover {
  border-color: #42b883;
}

/* light mode */
html:not(.dark) .skill-card {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 16px;
  height: 64px;
  background: radial-gradient(
    circle at var(--mx, 100%) var(--my, 100%),
    #f4f4f4,
    #eaeaea
  );
  transition:
    border-color 0.3s,
    transform 0.3s,
    box-shadow 0.3s;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.3);
}

html:not(.dark) .skill-header {
  color: #222;
}
</style>