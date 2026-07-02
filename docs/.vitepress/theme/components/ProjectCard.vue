<template>
  <div class="project-card">
    <a :href="data.link" class="project-card-link">

      <div class="project-card-image">
        <img :src="data.img" :alt="data.title" class="project-card-img" />

        <div v-if="data.status" class="project-card-badge" :class="badgeClass">
          {{ data.status }}
        </div>
      </div>

      <div class="project-card-content">

        <div class="project-card-header">
          <h3 class="project-card-title">{{ data.title }}</h3>
        </div>
        <p class="project-card-description">
          {{ data.description }}
        </p>

        <div class="project-card-tags">
          <span 
            v-for="t in normalizedTags" 
            :key="t.label" class="project-card-tag"
            :style="{ '--tag-color': t.color }">
              {{ t.label }}
          </span>
        </div>

      </div>

    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { projects } from '../projects'
import { TAG_COLORS } from '../utils/tagColors'
import { statusBadgeClass } from '../utils/statusBadge'

const props = defineProps({
  project: String
})
const data = computed(() => projects[props.project] ?? null)
const badgeClass = computed(() => statusBadgeClass(data.value?.status))

const HIDDEN_TAGS = new Set(['Featured', 'Solo', 'Group'])

const normalizedTags = computed(() =>
  (data.value?.tags || [])
    .filter(t => !HIDDEN_TAGS.has(t))
    .map(t => ({
      label: t,
      color: TAG_COLORS[t] || TAG_COLORS.Default
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
)
</script>

<style scoped>
.project-card {
  position: relative;
  background: linear-gradient(135deg, #252525, #373737);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #2f2f2f;
  transition: all 0.25s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: #42b883;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

.project-card-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

/* image */
.project-card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .project-card-img {
  transform: scale(1.05);
}

/* badges */
.project-card-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  backdrop-filter: blur(2px);
  border: 1px solid;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
  letter-spacing: 0.5px;
}

/* content */
.project-card-content {
  padding: 14px;
}

/* header */
.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.project-card-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
}

/* tag */
.project-card-tag {
  font-size: 0.7rem;
  line-height: 1;
  padding: 3px 8px;
  border-radius: 6px;

  background: rgba(255, 255, 255, 0.04);
  color: #aaa;
  border: 1px solid rgba(255, 255, 255, 0.08);
  
  white-space: nowrap;
  transition: all 0.2s ease;
}
.project-card-tag:hover {
  color: var(--tag-color);
  border-color: var(--tag-color);
  background: color-mix(in srgb, var(--tag-color) 12%, transparent);
}

.project-card-tags {
  display: flex;
  margin-top: 10px;
  gap: 8px;

  overflow-x: auto;
  overflow-y: hidden;
  
  flex-wrap: nowrap;
  align-items: center;

  scrollbar-width: none;
}
.project-card-tags::-webkit-scrollbar {
  display: none;
}

/* description */
.project-card-description {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.4;
}

/* light mode */
html:not(.dark) .project-card {
  background-color: #f5f5f5;
  background: linear-gradient(135deg, #f5f5f5, #eaeaea);
}

html:not(.dark) .project-card-description {
  color: #444;
}

html:not(.dark) .project-card-title {
  color: #111;
}

html:not(.dark) .project-card-tag {
  background: #f5f5f5;
}

</style>
