<template>
  <div class="feature-container">
    <div class="feature-list" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div
        class="feature-card"
        v-for="(feature, index) in features"
        :key="index"
        :class="{ hovered: hoveredIndex === index }"
        @mouseenter="showDescription(feature, index)"
        @mouseleave="clearDescription"
      >
        <div class="feature-header">
          <component
            :is="lucideIcons[feature.icon] || DefaultIcon"
            class="lucide-icon"
          />
          <strong>{{ feature.title }}</strong>
        </div>
      </div>
    </div>

    <div class="description-box">
      <div class="desc-header">
        <component
          :is="lucideIcons[hoveredFeatureIcon] || DefaultIcon"
          class="lucide-icon"
        />
        <strong class="desc-title">{{ hoveredFeatureTitle || 'Hover over an item' }}</strong>
      </div>
      <p class="desc-body">
        {{ hoveredFeatureDescription || 'Description will appear here.' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as lucideIcons from 'lucide-vue-next'
import { Wrench } from 'lucide-vue-next'

const DefaultIcon = Wrench
defineProps({
  features: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Number,
    default: 1
  }
});

const hoveredFeatureTitle = ref('');
const hoveredFeatureDescription = ref('');
const hoveredFeatureIcon = ref('');
const hoveredIndex = ref(null);

function showDescription(feature, index) {
  hoveredFeatureTitle.value = feature.title;
  hoveredFeatureDescription.value = feature.description;
  hoveredFeatureIcon.value = feature.icon;
  hoveredIndex.value = index;
}

function clearDescription() {
  hoveredFeatureTitle.value = '';
  hoveredFeatureDescription.value = '';
  hoveredFeatureIcon.value = '';
  hoveredIndex.value = null;
}
</script>

<style scoped>
@media (max-width: 600px) {
  .feature-container {
    flex-direction: column;
    gap: 20px;
  }
  .feature-list {
    width: 100%;
    min-width: auto;
    grid-template-columns: repeat(1, 1fr) !important; /* force one column */
  }
  .description-box {
    width: 100%;
    min-height: auto;
  }
}

.feature-container {
  display: flex;
  gap: 32px;
  align-items: stretch;
  flex-wrap: wrap;
}

.feature-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, 1fr);
  flex: 1;
  min-width: 300px;
}

.feature-card {
  display: flex;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 16px;
  background-color: #252525;
  color: white;
  transition: background-color 0.3s, border-color 0.3s, transform 0.2s;
  font-size: 1rem;
}

.feature-card.hovered {
  border-color: rgba(66,184,131);
  background-color: #353b3b;
  transform: scale(1.02);
  box-shadow: 0 0 12px rgba(66,184,131, 0.2);
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lucide-icon {
  width: 32px;
  height: 32px;
  color: #ccc;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}
html:not(.dark) .lucide-icon {
  color: #333;
}
.feature-card.hovered .lucide-icon,
.description-box .lucide-icon {
  color: #42b883;
}

/* Description box styles */
.description-box {
  width: 300px;
  background-color: #1f1f1f;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 20px;
  color: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  font-size: 1rem;
  min-height: 100%;
}

.desc-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.desc-title {
  font-size: 1.2rem;
}

.desc-body {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #ccc;
}

/* Light mode support */
html:not(.dark) .feature-card {
  background-color: #f5f5f5;
  border-color: #ccc;
  color: #111;
}
html:not(.dark) .feature-card:hover {
  background-color: #e8e8e8;
  border-color: #999;
}

html:not(.dark) .description-box {
  background-color: #f5f5f5;
  border-color: #ccc;
  color: #222;
}

html:not(.dark) .desc-body {
  color: #444;
}
</style>
