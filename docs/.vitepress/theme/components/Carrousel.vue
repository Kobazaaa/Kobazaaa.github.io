<template>
  <div class="carousel-container">
    <!-- Previous Button -->
    <button @click="move(-1)" class="carousel-btn prev-btn">&#10094;</button>

    <!-- Carousel Images -->
    <div class="carousel">
      <div
        class="carousel-images"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          :alt="'Image ' + (index + 1)"
          class="carousel-image"
        />
      </div>
    </div>

    <!-- Next Button -->
    <button @click="move(1)" class="carousel-btn next-btn">&#10095;</button>

    <!-- Navigation Dots -->
    <div class="dots-container">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="['dot', { 'dot-filled': currentIndex === index }]"
        @click="goToImage(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const currentIndex = ref(0);

// Move to the next or previous image
function move(direction) {
  currentIndex.value = (currentIndex.value + direction + props.images.length) % props.images.length;
}

// Jump to a specific image when clicking a dot
function goToImage(index) {
  currentIndex.value = index;
}
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
  border: 3px solid #42b883;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.carousel-btn, .dots-container {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-container:hover .carousel-btn,
.carousel-container:hover .dots-container {
  opacity: 1;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5rem;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10;
  width: 40px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-images {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  flex-shrink: 0;
}

.dots-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--vp-brand-color, #a7d4c2a1);
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot-filled {
  background-color: var(--vp-brand-color, #42b983);
  transform: scale(1.3);
}

/* Light mode support */
html:not(.dark) .carousel-btn {
  background-color: #f5f5f580;
  color: #111;
}
html:not(.dark) .carousel-btn.carousel-btn:hover {
  background-color: #f5f5f5e1;
}
html:not(.dark) .carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

html:not(.dark) .dot {
  background-color: #586b63a1;
}
html:not(.dark) .dot-filled {
  background-color: #42b983;
}
html:not(.dark) .dots-container {
  background-color: #f5f5f580;
}
</style>
