<template>
  <div class="project-card">
    <a :href="link" style="display: block; height: 100%; color: inherit; text-decoration: none;">
      <img :src="img" :alt="alt" class="project-card-img" />
      <div style="padding: 16px;">
        <h3 style="margin: 0; font-size: 1.2rem; font-weight: bold;">{{ title }}</h3>
        <p style="margin-top: 8px; color: #bbb;">{{ description }}</p>
      </div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  link: String,
  img: String,
  alt: String,
  title: String,
  description: String,
})
</script>

<style scoped>
.project-card {
  width: 357px;
  height: 350px;
  background-color: #2b2d2e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}

.project-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
}

.project-card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
