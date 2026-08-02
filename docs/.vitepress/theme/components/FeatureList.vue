<template>
  <div class="feature-container" ref="rootEl">
    <div class="feature-list" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div
        class="feature-card"
        v-for="(feature, index) in features"
        :key="index"
        :class="{ hovered: hoveredIndex === index || pinnedIndex === index }"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
        @click="togglePin(index)"
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
          :is="lucideIcons[displayFeature?.icon] || DefaultIcon"
          class="lucide-icon"
        />
        <strong class="desc-title">{{ displayFeature?.title || 'Select an item' }}</strong>
      </div>
      <p class="desc-body">
        {{ displayFeature?.description || 'Hover or tap a feature to see its description.' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import * as lucideIcons from 'lucide-vue-next'
import { Wrench } from 'lucide-vue-next'

const DefaultIcon = Wrench
const props = defineProps({
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

// Clicking a card "pins" it so its description stays up regardless of where
// the mouse goes afterward - hovering a *different* card while one is pinned
// only highlights it, it doesn't steal the description. With nothing pinned,
// hover falls back to previewing whatever's under the cursor (so unpinning
// a card the mouse never left doesn't blank the panel), and it's also what
// makes the description reachable on touch, where hover never fires.
// Clicking the pinned card again, clicking outside, or Escape all unpin.
const hoveredIndex = ref(null);
const pinnedIndex = ref(null);
const rootEl = ref(null);

const pinnedFeature = computed(() =>
  pinnedIndex.value !== null ? props.features[pinnedIndex.value] : null
);
const hoveredFeature = computed(() =>
  hoveredIndex.value !== null ? props.features[hoveredIndex.value] : null
);
const displayFeature = computed(() => pinnedFeature.value ?? hoveredFeature.value);

function togglePin(index) {
  pinnedIndex.value = pinnedIndex.value === index ? null : index;
}

function unpin() {
  pinnedIndex.value = null;
}

function handleDocumentClick(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) {
    unpin();
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape') unpin();
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
@media (max-width: 640px) {
  .feature-container {
    flex-direction: column !important;
    gap: 20px !important;
  }
  .feature-list {
    width: 100% !important;
    min-width: auto !important;
    grid-template-columns: repeat(1, 1fr) !important; /* force one column */
  }
  .description-box {
    width: 100% !important;
    min-height: auto !important;
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
  cursor: pointer;
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
