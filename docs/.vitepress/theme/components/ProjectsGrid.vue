<template>
  <div class="pg-root">
    <div class="pg-toolbar" role="search">
      <div v-if="showSearch" class="pg-search">
        <Search class="pg-icon" aria-hidden="true" />
        <input
          v-model.trim="query"
          class="pg-input"
          type="search"
          :placeholder="searchPlaceholder"
          aria-label="Search projects"
        />
        <button
          class="pg-clear"
          type="button"
          @click="query = ''"
          aria-label="Clear search"
          :class="{ 'is-visible': query.length }"
        >
          <X class="pg-icon" aria-hidden="true" />
        </button>
      </div>

      <div class="pg-controls" :class="{ 'is-compact': !showSearch }">
    <div class="pg-mode" role="group" aria-label="Tag filter mode">
          <button
            type="button"
      :class="['pg-segment', { active: mode === 'AND' }]"
            @click="mode = 'AND'"
            title="Require all selected tags"
          >
            AND
          </button>
          <button
            type="button"
      :class="['pg-segment', { active: mode === 'OR' }]"
            @click="mode = 'OR'"
            title="Match any selected tag"
          >
            OR
          </button>
        </div>

        <button class="pg-pill" type="button" @click="expanded = !expanded">
          {{ expanded ? 'Hide tags' : 'Show tags' }}
        </button>
        <button class="pg-pill" type="button" @click="reset">
          Reset
        </button>
      </div>
    </div>

    <div class="pg-tags" :class="{ expanded }">
      <div class="pg-tags-row">
        <div class="pg-taglist">
          <button
            v-for="t in visibleTags"
            :key="t"
            type="button"
            @click="toggleTag(t)"
            :class="['pg-tag', { active: selectedTags.includes(t), featured: t === defaultTag }]"
            :title="`${t} (${tagCounts[t] || 0})`"
          >
            <span class="pg-tag-label">{{ t }}</span>
            <span class="pg-tag-count">{{ tagCounts[t] || 0 }}</span>
          </button>
        </div>

        <div class="pg-results" aria-live="polite">
          {{ filteredKeys.length }} / {{ allKeys.length }}
        </div>
      </div>
    </div>

    <div class="projects-grid">
      <ProjectCard v-for="key in filteredKeys" :key="key" :project="key" />
    </div>

    <p v-if="!filteredKeys.length" class="pg-empty">
      No matches. Try a different search term or fewer tags.
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Search, X } from 'lucide-vue-next'
import ProjectCard from './ProjectCard.vue'
import { projects } from '../projects'

const props = defineProps({
  defaultTag: {
    type: String,
    default: 'Featured'
  },
  defaultSelectedTags: {
    type: Array,
    default: () => ['Featured']
  },
  searchPlaceholder: {
    type: String,
    default: 'Search projects…'
  }
})

const query = ref('')
const expanded = ref(false)
const mode = ref('AND') // AND | OR
const selectedTags = ref([...props.defaultSelectedTags])

const allKeys = computed(() => Object.keys(projects))

const tagCounts = computed(() => {
  const counts = {}
  Object.values(projects).forEach((p) => (p.tags || []).forEach((t) => (counts[t] = (counts[t] || 0) + 1)))
  return counts
})

const allTags = computed(() => {
  const priority = { [props.defaultTag]: 0, Solo: 1, Group: 2 }
  return Object.keys(tagCounts.value).sort((a, b) => {
    const pa = Object.prototype.hasOwnProperty.call(priority, a) ? priority[a] : 3
    const pb = Object.prototype.hasOwnProperty.call(priority, b) ? priority[b] : 3
    if (pa !== pb) return pa - pb
    return a.localeCompare(b)
  })
})

const visibleTags = computed(() => (expanded.value ? allTags.value : selectedTags.value))

function toggleTag(tag) {
  const current = selectedTags.value
  const idx = current.indexOf(tag)

  // Nice QoL: if only defaultTag is selected and user selects a different tag, drop defaultTag
  if (idx === -1 && current.length === 1 && current[0] === props.defaultTag && tag !== props.defaultTag) {
    selectedTags.value = [tag]
    return
  }

  if (idx === -1) current.push(tag)
  else current.splice(idx, 1)
}

function reset() {
  query.value = ''
  expanded.value = false
  selectedTags.value = [...props.defaultSelectedTags]
}

const filteredKeys = computed(() => {
  const q = query.value.toLowerCase()
  const tags = selectedTags.value
  const onlyDefaultTagSelected =
    tags.length === 1 &&
    tags[0] === props.defaultTag

  // QoL: if the user is actively searching and they haven't chosen any real filters
  // (only the default tag is selected), don't restrict search results to that default tag.
  const shouldApplyTagFilter = !(q && onlyDefaultTagSelected)

  let entries = Object.entries(projects)

  if (tags.length && shouldApplyTagFilter) {
    entries = entries.filter(([, p]) => {
      const pTags = p.tags || []
      if (mode.value === 'AND') return tags.every((t) => pTags.includes(t))
      return tags.some((t) => pTags.includes(t))
    })
  }

  if (q) {
    entries = entries.filter(([, p]) => {
      const hay = `${p.title}\n${p.description}\n${(p.tags || []).join(' ')}\n${p.status || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }

  // Keep your explicit ordering (the project's "order" field).
  entries.sort((a, b) => (a[1].order || 999999) - (b[1].order || 999999))

  return entries.map(([k]) => k)
})
</script>

<style scoped>
.pg-root {
  width: 100%;
}

.pg-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin: 10px 0 10px;
}

.pg-search {
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

.pg-input {
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  color: var(--vp-c-text-1);
  width: 100%;
  font-size: 0.95rem;
}

/* Prevent the browser-provided clear (X) icon on search inputs */
.pg-input::-ms-clear,
.pg-input::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

.pg-input::-webkit-search-decoration,
.pg-input::-webkit-search-cancel-button,
.pg-input::-webkit-search-results-button,
.pg-input::-webkit-search-results-decoration {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

.pg-icon {
  width: 18px;
  height: 18px;
  opacity: 0.75;
  flex: 0 0 auto;
}

.pg-clear {
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

  /* reserve space without causing layout shift */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.pg-clear.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.pg-clear:hover {
  background: rgba(255, 255, 255, 0.10);
}

.pg-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.pg-mode {
  display: inline-flex;
  gap: 8px;
}

/* Segmented toggle (AND/OR) */
.pg-mode {
  gap: 0;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.pg-segment {
  border: none;
  background: transparent;
  color: #cfcfcf;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.pg-segment + .pg-segment {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.pg-segment:hover {
  background: rgba(66, 184, 131, 0.08);
}

.pg-segment.active {
  background: #42b883;
  color: #fff;
}

.pg-pill {
  background: rgba(255, 255, 255, 0.02);
  color: #cfcfcf;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.pg-pill:hover {
  border-color: rgba(66, 184, 131, 0.45);
  background: rgba(66, 184, 131, 0.08);
}

.pg-pill.active {
  background: #42b883;
  color: #fff;
  border-color: transparent;
}

.pg-tags {
  margin: 10px 0 16px;
}

.pg-tags-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.pg-results {
  font-size: 0.8rem;
  opacity: 0.55;
  white-space: nowrap;
  margin-left: auto;
  padding: 0 2px;
}

.pg-taglist {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pg-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.02);
  color: #cfcfcf;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.9rem;
  white-space: nowrap;
}

.pg-tag.featured {
  border-style: dashed;
  opacity: 0.95;
}

.pg-tag.active {
  background: #42b883;
  color: #fff;
  border-color: transparent;
}

.pg-tag-label {
  line-height: 1;
}

.pg-tag-count {
  opacity: 0.75;
  font-size: 0.78rem;
  line-height: 1;
}

.pg-empty {
  margin-top: 14px;
  opacity: 0.8;
}

/* light mode */
html:not(.dark) .pg-search,
html:not(.dark) .pg-pill,
html:not(.dark) .pg-mode,
html:not(.dark) .pg-results {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
}

html:not(.dark) .pg-segment + .pg-segment {
  border-left-color: rgba(0, 0, 0, 0.12);
}

html:not(.dark) .pg-clear {
  background: rgba(0, 0, 0, 0.04);
}

html:not(.dark) .pg-clear:hover {
  background: rgba(0, 0, 0, 0.07);
}
</style>
