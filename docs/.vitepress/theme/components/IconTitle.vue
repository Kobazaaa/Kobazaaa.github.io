<template>
  <div class="header">
    <template v-if="img">
      <img :src="img" :alt="title" width="32" height="32" />
    </template>
    <template v-else>
      <component :is="lucideIcons[fallback] || DefaultIcon" class="lucide-icon" />
    </template>
    <strong>{{ title }}</strong>
  </div>
</template>

<script setup>
import { lucideIcons, DefaultIcon } from '../utils/icons'

defineProps({
  title: { type: String, default: '' },
  img: { type: String, default: '' },
  fallback: { type: String, default: '' }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  color: inherit;
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
</style>
