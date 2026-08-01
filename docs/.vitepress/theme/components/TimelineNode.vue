<!-- .vitepress/theme/components/TimelineNode.vue -->
<template>
  <div class="timeline-node">
    <strong class="timeline-node-title">{{ title }}</strong>
    <div class="timeline-node-subtitle">{{ subtitle }}</div>
    <div class="timeline-node-date">{{ date }}</div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  date: String
})
</script>

<style scoped>
.timeline-node {
  position: relative;
  padding-left: 28px;
  padding-bottom: 18px;
  border-left: 2px solid rgba(66, 184, 131, 0.35);
}

.timeline-node:last-child {
  border-left-color: transparent;
  padding-bottom: 0;
}

.timeline-node::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #42b883;
  box-shadow: 0 0 0 3px #191919;
}

.timeline-node-title {
  font-size: 0.98rem;
  font-weight: 600;
}

.timeline-node-subtitle {
  margin-top: 4px;
  font-size: 0.85rem;
  color: #bbb;
}

.timeline-node-date {
  margin-top: 2px;
  font-size: 0.78rem;
  color: #888;
}

/* light mode */
html:not(.dark) .timeline-node::before {
  box-shadow: 0 0 0 3px #e8e8e8;
}

html:not(.dark) .timeline-node-subtitle {
  color: #444;
}

html:not(.dark) .timeline-node-date {
  color: #777;
}
</style>
