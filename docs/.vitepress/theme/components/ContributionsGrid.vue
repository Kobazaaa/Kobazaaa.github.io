<template>
  <div class="contrib-root">
    <div class="contrib-toolbar" role="search">
      <div v-if="showSearch" class="contrib-search">
        <Search class="contrib-icon" aria-hidden="true" />
        <input
          v-model.trim="query"
          class="contrib-input"
          type="search"
          :placeholder="searchPlaceholder"
          aria-label="Search contributions"
        />
        <button
          v-if="query.length"
          class="contrib-clear"
          type="button"
          @click="query = ''"
          aria-label="Clear search"
        >
          <X class="contrib-icon" aria-hidden="true" />
        </button>
      </div>

  <div class="contrib-controls" :class="{ 'is-compact': !showSearch && !showSort }">
        <label v-if="showSort" class="contrib-select">
          <span class="contrib-select-label">Sort</span>
          <select v-model="sortMode" class="contrib-select-native" aria-label="Sort contributions">
            <option value="alpha">A → Z</option>
            <option value="group">By category</option>
          </select>
        </label>

        <label class="contrib-select">
          <span class="contrib-select-label">Filter</span>
          <select v-model="activeGroup" class="contrib-select-native" aria-label="Filter by category">
            <option value="">All</option>
            <option v-for="g in groups" :key="g" :value="g">{{ g }}</option>
          </select>
        </label>

        <div class="contrib-count" aria-live="polite">
          {{ filtered.length }} / {{ normalized.length }}
        </div>
      </div>
    </div>

    <div
      class="contrib-grid"
      :style="{
        gridTemplateColumns: `repeat(${resolvedColumns}, minmax(0, 1fr))`
      }"
    >
      <article
        v-for="item in filtered"
        :key="item._key"
        class="contrib-card"
        :data-group="item.group || ''"
      >
        <header class="contrib-card-header">
          <div class="contrib-card-titlewrap">
            <h4 class="contrib-card-title">{{ item.title }}</h4>
            <div v-if="item.group" class="contrib-card-badge">
              {{ item.group }}
            </div>
          </div>
        </header>

        <p v-if="item.description" class="contrib-card-desc">
          {{ item.description }}
        </p>

        <ul v-if="item.tags?.length" class="contrib-tags" aria-label="Tags">
          <li v-for="t in item.tags" :key="t" class="contrib-tag">{{ t }}</li>
        </ul>
      </article>
    </div>

    <p v-if="!filtered.length" class="contrib-empty">
      No matches. Try a different keyword.
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Search, X } from 'lucide-vue-next'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Number,
    default: 3
  },
  searchPlaceholder: {
    type: String,
    default: 'Search contributions…'
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  showSort: {
    type: Boolean,
    default: true
  }
})

const query = ref('')
const sortMode = ref('group') // 'group' | 'alpha'
const activeGroup = ref('')

const normalized = computed(() =>
  (props.items || []).map((it, idx) => ({
    _key: it.id ?? `${it.title ?? 'item'}-${idx}`,
    title: it.title ?? String(it),
    description: it.description ?? '',
    group: it.group ?? '',
    tags: it.tags ?? []
  }))
)

const groups = computed(() => {
  const set = new Set()
  for (const it of normalized.value) {
    if (it.group) set.add(it.group)
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

const filtered = computed(() => {
  const q = query.value.toLowerCase()

  let out = normalized.value

  if (activeGroup.value) {
    out = out.filter((it) => it.group === activeGroup.value)
  }

  if (q) {
    out = out.filter((it) => {
      const hay = `${it.title}\n${it.description}\n${(it.tags || []).join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
  }

  if (sortMode.value === 'alpha') {
    out = [...out].sort((a, b) => a.title.localeCompare(b.title))
  } else {
    out = [...out].sort((a, b) => {
      const ag = a.group || 'Zzz'
      const bg = b.group || 'Zzz'
      const g = ag.localeCompare(bg)
      if (g !== 0) return g
      return a.title.localeCompare(b.title)
    })
  }

  return out
})

const resolvedColumns = computed(() => Math.max(1, props.columns || 1))
</script>

<style scoped>
.contrib-root {
  width: 100%;
}

.contrib-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin: 16px 0 18px;
}

.contrib-search {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  min-width: min(520px, 100%);
  flex: 1 1 320px;
}

.contrib-input {
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  color: var(--vp-c-text-1);
  width: 100%;
  font-size: 0.95rem;
}

.contrib-icon {
  width: 18px;
  height: 18px;
  opacity: 0.75;
  flex: 0 0 auto;
}

.contrib-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
}

.contrib-clear:hover {
  background: rgba(255, 255, 255, 0.10);
}

.contrib-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* When we hide search + sort, the remaining UI should sit on the right */
.contrib-controls.is-compact {
  margin-left: auto;
}

.contrib-select {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 999px;
  position: relative;
}

.contrib-select-label {
  font-size: 0.8rem;
  opacity: 0.75;
}

.contrib-select-native {
  border: none;
  outline: none;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.9rem;
  padding-right: 18px;
  appearance: none;
  -webkit-appearance: none;
  line-height: 1;
}

/* Dropdown list (opened options) styling */
.contrib-select-native option,
.contrib-select-native optgroup {
  background-color: #1f1f1f;
  color: #eaeaea;
}

html:not(.dark) .contrib-select-native option,
html:not(.dark) .contrib-select-native optgroup {
  background-color: #ffffff;
  color: #111;
}

/* Custom caret */
.contrib-select::after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  border-right: 2px solid rgba(255, 255, 255, 0.45);
  border-bottom: 2px solid rgba(255, 255, 255, 0.45);
  pointer-events: none;
}

.contrib-select:hover {
  border-color: rgba(66, 184, 131, 0.45);
  background: rgba(66, 184, 131, 0.08);
}

/* Light mode tweaks */
html:not(.dark) .contrib-select {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
}

html:not(.dark) .contrib-select::after {
  border-right-color: rgba(0, 0, 0, 0.45);
  border-bottom-color: rgba(0, 0, 0, 0.45);
}

.contrib-count {
  font-size: 0.8rem;
  opacity: 0.55;
  padding: 0 2px;
  border: none;
  background: transparent;
}

.contrib-grid {
  display: grid;
  gap: 14px;
}

.contrib-card {
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  padding: 14px 14px 12px;
  transition: transform 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}

.contrib-card:hover {
  transform: translateY(-1px);
  border-color: rgba(66, 184, 131, 0.55);
  background: rgba(66, 184, 131, 0.06);
}

.contrib-card-titlewrap {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 10px;
}

.contrib-card-title {
  font-size: 1rem;
  margin: 0;
  line-height: 1.25;
}

.contrib-card-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(66, 184, 131, 0.45);
  color: rgba(66, 184, 131);
  background: rgba(66, 184, 131, 0.10);
  white-space: nowrap;
  margin-top: 2px;
}

.contrib-card-desc {
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.45;
}

.contrib-tags {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.contrib-tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  opacity: 0.9;
}

.contrib-empty {
  margin-top: 14px;
  opacity: 0.8;
}

@media (max-width: 900px) {
  .contrib-search {
    min-width: 100%;
  }
}

/* Light mode tweaks */
html:not(.dark) .contrib-search,
html:not(.dark) .contrib-select,
html:not(.dark) .contrib-count,
html:not(.dark) .contrib-card {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
}

html:not(.dark) .contrib-clear {
  background: rgba(0, 0, 0, 0.04);
}

html:not(.dark) .contrib-clear:hover {
  background: rgba(0, 0, 0, 0.07);
}

html:not(.dark) .contrib-card:hover {
  border-color: rgba(46, 125, 50, 0.45);
  background: rgba(46, 125, 50, 0.06);
}
</style>
