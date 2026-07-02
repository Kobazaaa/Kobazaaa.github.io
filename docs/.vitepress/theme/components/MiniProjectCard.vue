<template>
  <a :href="link" class="mini-project-card">
    <div class="mini-project-card-content">
      <div class="mini-project-card-header">
        <h4 class="mini-project-title">{{ title }}</h4>
        <span v-if="status" class="mini-project-badge" :class="badgeClass">{{ status }}</span>
      </div>
      <p class="mini-project-description">{{ description }}</p>
    </div>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { statusBadgeClass } from '../utils/statusBadge'

const props = defineProps({
  link: String,
  title: String,
  description: String,
  status: String,
})

const badgeClass = computed(() => statusBadgeClass(props.status))
</script>

<style scoped>
.mini-project-card {
  display: block;
  background-color: #2b2d2e;
  border-radius: 10px;
  padding: 16px;
  transition: transform 0.2s ease;
  border: 1px solid #3c3c3c;
  text-decoration: none;
  color: inherit;
  background: linear-gradient(135deg, #252525, #373737);
}

.mini-project-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.mini-project-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mini-project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mini-project-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

.mini-project-description {
  font-size: 0.875rem;
  color: #bbb;
  margin: 0;
}

/* Badge styling */
.mini-project-badge {
  position: relative;
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
</style>
