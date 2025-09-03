<template>
  <div class="project-card">
    <a :href="link" class="project-card-link">
      <div v-if="status" class="project-card-badge" :class="badgeClass">
        {{ status }}
      </div>
      <img :src="img" :alt="alt" class="project-card-img" />
      <div class="project-card-content">
        <h3 class="project-card-title">{{ title }}</h3>
        <p class="project-card-description">{{ description }}</p>
      </div>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  link: String,
  img: String,
  alt: String,
  title: String,
  description: String,
  status: String,
})

const badgeClass = computed(() => {
  switch (props.status?.toLowerCase()) {
    case 'finished':
      return 'badge-completed'
    case 'on hold':
      return 'badge-on-hold'
    case 'active development':
      return 'badge-active-development'
    case 'prototype':
      return 'badge-prototype'
    default:
      return 'badge-default'
  }
})
</script>

<style scoped>
@media (max-width: 600px) {
  .project-card {
    height: auto;
    min-height: 460px;
  }
}
.project-card {
  position: relative;
  height: 385px;
  background-color: #2b2d2e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;

  background: linear-gradient(135deg, #252525, #373737);
}

.project-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
}

.project-card-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.project-card-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.project-card-content {
  padding: 16px;
}

.project-card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.project-card-description {
  margin-top: 8px;
  color: #bbb;
}

/* Badge styling */
.project-card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  border: 2px solid;
  backdrop-filter: blur(2px);
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
  letter-spacing: 0.5px;
}
.badge-completed {
  background-color: rgba(85, 174, 238, 0.3);
  border-color: rgba(102, 204, 255, 0.4);
  color: hsl(190, 50%, 75%);
}
.badge-on-hold {
  background-color: rgba(200, 120, 120, 0.4);
  border-color: rgba(200, 120, 120, 0.35);
  color: #dfb5b5;
}
.badge-active-development {
  background-color: rgba(72, 206, 140, 0.4);
  border-color: rgba(120, 200, 160, 0.35);
  color: #b9dfcf;
}
.badge-prototype {
  background-color: rgba(170, 160, 220, 0.4);
  border-color: rgba(170, 160, 220, 0.3);
  color: #beb3e3;
}
.badge-default {
  background-color: rgba(150, 150, 150, 0.4);
  border-color: rgba(160, 160, 160, 0.3);
  color: #ccc;
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
</style>
