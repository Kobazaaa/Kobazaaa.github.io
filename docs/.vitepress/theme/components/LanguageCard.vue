<!-- .vitepress/theme/components/LanguageCard.vue -->
<template>
  <div class="language-card">
    <strong>{{ title }}</strong>
    <hr />
    
    <p class="rating-row">
      <span>Speaking:</span>
      <progress :value="speakingValue" max="20"></progress>
    </p>

    <p class="rating-row">
      <span>Understanding:</span>
      <progress :value="understandingValue" max="20"></progress>
    </p>

    <p class="rating-row">
      <span>Writing:</span>
      <progress :value="writingValue" max="20"></progress>
    </p>

  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  img: String,
  speaking: String,
  understanding: String,
  writing: String
})

function countGreenSquares(str) {
  return (str.match(/🟩/g) || []).length
}

const speakingValue = countGreenSquares(props.speaking)
const understandingValue = countGreenSquares(props.understanding)
const writingValue = countGreenSquares(props.writing)

</script>

<style scoped>
.language-card {
  border: 1px solid #444;
  border-radius: 10px;
  padding: 16px;
  background-color: #2b2d2e;
  color: #fff;
  background: linear-gradient(135deg, #252525, #373737);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 2px 4px rgba(0, 0, 0, 0.3);
}
.language-card hr {
  margin: 8px 0;
}

.language-card p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
  gap: 24px;
}
.language-card p span {
  width: 120px; /* fixed width for all labels */
  white-space: nowrap;
}

.language-card progress {
  flex-grow: 1;
  width: auto;
  height: 14px;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 7px;
  overflow: hidden;
  background-color: #555;
  cursor: default;
}

.language-card progress::-webkit-progress-bar {
  background-color: #555;
  border-radius: 7px;
}
.language-card progress::-webkit-progress-value {
  background-color: #42b883;
  border-radius: 7px;
}
.language-card progress::-moz-progress-bar {
  background-color: #42b883;
  border-radius: 7px;
}

/* light mode */
html:not(.dark) .language-card {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  color: #111;
  background: linear-gradient(135deg, #f4f4f4, #eaeaea);
}
html:not(.dark) .language-card progress::-webkit-progress-bar {
  background-color: #d8d8d8;
  border-radius: 7px;
}

.language-card p {
  margin: 0;
}
</style>
