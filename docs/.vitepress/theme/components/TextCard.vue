<template>
  <div class="card">
    <div class="header">
      <component
        v-if="icon"
        :is="lucideIcons[icon] || DefaultIcon"
        class="lucide-icon"
      />
      <strong>{{ title }}</strong>
    </div>

<p v-if="description" class="description" v-html="description"></p>
  </div>
</template>

<script setup>
import * as lucideIcons from 'lucide-vue-next'
const DefaultIcon = lucideIcons['Wrench']

defineProps({
  title: String,
  description: String,
  icon: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.card {
  border: 1px solid #444;
  border-radius: 10px;
  padding: 16px;
  background: linear-gradient(135deg, #252525, #373737);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.lucide-icon {
  width: 24px;
  height: 24px;
  color: #ccc;
}

.card:hover .lucide-icon {
  color: #42b883;
}

.description {
  margin: 0;
  opacity: 0.85;
}

ul {
  margin: 0;
  padding-left: 18px;
}

li {
  margin-bottom: 6px;
}

/* light mode */
html:not(.dark) .card {
  background: linear-gradient(135deg, #f4f4f4, #eaeaea);
  border-color: #ccc;
}

html:not(.dark) .header {
  color: #222;
}

html:not(.dark) .lucide-icon {
  color: #333;
}
</style>