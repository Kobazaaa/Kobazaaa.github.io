<template>
  <div class="image-reveal-container">
    <div class="image-stack">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-layer"
        :style="getLayerStyle(index)"
      >
        <img :src="image.src" />
      </div>
    </div>

    <input
      class="slider"
      type="range"
      min="0"
      :max="100"
      step="0.01"
      v-model="progress"
    />


    <div class="image-titles">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['image-title', { active: index === activeIndex }]"
        @click="jumpToImage(index)"
      >
        {{ image.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  start: {
    type: Number,
    default: 0
  }
})

const progress = ref(props.start)

const getLayerStyle = (index) => {
  const total = props.images.length
  if (index === 0) return {} // base image always shown

  const segmentSize = 100 / (total - 1)
  const start = segmentSize * (index - 1)
  const end = segmentSize * index

  if (progress.value <= start) {
    return { clipPath: 'inset(0 100% 0 0)' }
  } else if (progress.value >= end) {
    return {}
  } else {
    const percent = ((progress.value - start) / segmentSize) * 100
    return { clipPath: `inset(0 ${100 - percent}% 0 0)` }
  }
}

const activeIndex = computed(() => {
  const total = props.images.length
  const segmentSize = 100 / (total)
  return Math.min(total - 1, Math.floor(progress.value / segmentSize))
})

function jumpToImage(index) {
  const total = props.images.length
  const segmentSize = 100 / (total - 1)
  progress.value = segmentSize * index
}
</script>

<style scoped>
@media (max-width: 600px) {
  .image-reveal-container {
    max-width: 100%;
  }

  .image-stack {
    height: 250px;
}

  .slider::-webkit-slider-thumb,
  .slider::-moz-range-thumb {
    height: 45px;
    width: 30px;
  }

  .image-titles {
    font-size: 1.1rem;
    gap: 8px;
    flex-wrap: wrap;
  }

  .image-title {
    min-width: 50px;
    margin: 4px 6px;
  }

  .image-title.active {
    font-size: 1.2rem;
  }
}

.image-reveal-container {
  width: 100%;
  margin: auto;
  position: relative;
}

.image-stack {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  border: 3px solid #42b883;
}

.image-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.image-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  margin-top: 12px;
  background: #f5f5f5;
  accent-color: var(--vp-c-brand);
  border-radius: 8px;
  border: 1px solid #42b883;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 20px;
  background: #42b883;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.slider::-moz-range-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 20px;
  background: #42b883;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.image-titles {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.image-title {
  flex: 1;
  text-align: center;
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
}
html:not(.dark) .image-titles {
  color: #2b2b2b;
}

.image-title.active {
  opacity: 1;
  font-weight: bold;
  color: var(--vp-c-brand);
  font-size: 1rem;
}

</style>
