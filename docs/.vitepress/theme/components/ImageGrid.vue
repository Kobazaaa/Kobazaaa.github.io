<template>
  <div class="image-grid">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="grid-item"
      @click="openModal(image)"
    >
      <img
        :src="image.src"
        :alt="image.alt || `Image ${index + 1}`"
        class="grid-image"
      />
      <div
        v-if="image.caption"
        class="grid-caption"
      >
        {{ image.caption }}
      </div>
    </div>

    <div
      v-if="modalImage"
      class="modal"
      @click.self="closeModal"
    >
      <div class="modal-content">
        <img
          :src="modalImage.src"
          :alt="modalImage.alt || 'Full image'"
        />
        <div
          v-if="modalImage.caption"
          class="modal-caption"
        >
          {{ modalImage.caption }}
        </div>
        <button class="close-button" @click="closeModal">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  images: {
    type: Array,
    required: true
  }
})

const modalImage = ref(null)

function openModal(image) {
  modalImage.value = image
}

function closeModal() {
  modalImage.value = null
}

// Escape key handling
function handleKeyDown(e) {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
@media (max-width: 600px) {
  .image-grid {
    grid-template-columns: 1fr !important;
  }
  .grid-image {
    height: auto !important;
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
  grid-template-rows: auto;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;
}

.grid-image {
  width: 350px;
  height: 250px;
  border: 3px solid #42b883;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}

.grid-image:hover {
  transform: scale(1.02);
}

.grid-caption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-style: italic;
  color: #aaa;
  text-align: center;
}
html:not(.dark) .grid-caption {
  color: #757575;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
  border: 3px solid #42b883;
  border-radius: 15px;
}

.modal-caption {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-style: italic;
  padding-left: 16px;
  color: #eee;
}

.close-button {
  position: absolute;
  top: -15px;
  right: -15px;
  background: #222;
  color: #42b883;
  border: none;
  border-radius: 25%;
  width: 32px;
  height: 32px;
  font-size: 16px;
  cursor: pointer;
}

.close-button:hover {
  background: #444;
}
</style>
