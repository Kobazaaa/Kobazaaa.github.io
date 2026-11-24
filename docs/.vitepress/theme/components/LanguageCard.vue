<!-- .vitepress/theme/components/LanguageCard.vue -->
<template>
  <div class="language-card">
    <strong class="language-name">{{ title }}</strong>
    <span class="language-level">{{ level }}</span>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  level: String
})
</script>

<style scoped>
.language-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  min-height: 72px;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 18px 20px;
  background-color: #2b2d2e;
  color: #fff;
  background: linear-gradient(135deg, #252525, #373737);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.3);
}
.language-name {
  font-size: 1.05rem;
}
.language-level {
  flex-shrink: 0;
  padding: 5px 11px;
  border: 1px solid rgba(66, 184, 131, 0.35);
  border-radius: 999px;
  background: rgba(66, 184, 131, 0.12);
  color: #42b883;
  font-size: 0.85rem;
  font-weight: 600;
}

/* light mode */
html:not(.dark) .language-card {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  color: #111;
  background: linear-gradient(135deg, #f4f4f4, #eaeaea);
}
html:not(.dark) .language-level {
  border-color: rgba(22, 126, 85, 0.25);
  background: rgba(22, 126, 85, 0.08);
  color: #167e55;
}
</style>
