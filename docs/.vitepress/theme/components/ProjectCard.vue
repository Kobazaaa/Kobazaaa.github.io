<template>
  <div class="project-card">
    <a :href="link" class="project-card-link">
      <img :src="img" :alt="alt" class="project-card-img" />
      <div class="project-card-content">
        <h3 class="project-card-title">{{ title }}</h3>
        <p class="project-card-description">{{ description }}</p>
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
  width: 31.6%;
  height: 385px;
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

/* light mode */
html:not(.dark) .project-card {
  background-color: #f5f5f5;
}
html:not(.dark) .project-card-description {
  color: #444;
}
html:not(.dark) .project-card-title {
  color: #111;
}
</style>
