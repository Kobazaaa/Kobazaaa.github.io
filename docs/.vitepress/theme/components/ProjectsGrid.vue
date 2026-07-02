<template>
  <div class="pg-root">
    <div class="pg-toolbar" role="search">
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

      <div class="pg-right">
        <div class="pg-controls">
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

          <div class="pg-search-wrap" :class="{ open: searchOpen }">
            <div v-if="searchOpen" class="pg-search">
              <input
                ref="searchInputEl"
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

            <button
              type="button"
              class="pg-icon-btn"
              :class="{ active: searchOpen }"
              @click="toggleSearch"
              :aria-expanded="searchOpen"
              aria-label="Toggle project search"
              title="Search projects"
            >
              <component :is="searchOpen ? X : Search" class="pg-icon" aria-hidden="true" />
            </button>
          </div>
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
import { computed, ref, nextTick } from 'vue'
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

const searchOpen = ref(false)
const searchInputEl = ref(null)
const query = ref('')
const expanded = ref(false)
const mode = ref('AND') // AND | OR
const selectedTags = ref([...props.defaultSelectedTags])

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => searchInputEl.value?.focus({ preventScroll: true }))
  } else {
    query.value = ''
  }
}

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
  searchOpen.value = false
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  /* Keep the tag list and the settings/search cluster on the same row: the
     taglist absorbs all shrinking (and wraps its own tags internally), so
     the right-hand cluster never gets bumped onto a new line. */
  flex-wrap: nowrap;
  margin: 10px 0 16px;
}

/* Left: filter tag pills */
.pg-taglist {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
}

.pg-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  box-sizing: border-box;
  padding: 0 10px;
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

/* Right: AND/OR + show/hide tags + reset + search, with the result count stacked directly under. */
.pg-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-left: auto;
  /* Never shrink or wrap onto a new line — all the give/take when space
     is tight comes from the taglist next to it. */
  flex: 0 0 auto;
}

.pg-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

/* Segmented toggle (AND/OR) */
.pg-mode {
  display: inline-flex;
  align-items: stretch;
  height: 38px;
  box-sizing: border-box;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.pg-segment {
  display: inline-flex;
  align-items: center;
  border: none;
  background: transparent;
  color: #cfcfcf;
  padding: 0 12px;
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
  display: inline-flex;
  align-items: center;
  height: 38px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.02);
  color: #cfcfcf;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 12px;
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

/* Search: icon stays put on the far right, the field grows to its left */
.pg-search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pg-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  box-sizing: border-box;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.pg-icon-btn:hover {
  border-color: rgba(66, 184, 131, 0.45);
  background: rgba(66, 184, 131, 0.08);
}

.pg-icon-btn.active {
  border-color: #42b883;
  background: rgba(66, 184, 131, 0.14);
  color: #42b883;
}

.pg-search {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  flex: 0 1 260px;
  min-width: 140px;
  max-width: 320px;
}

.pg-input {
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  color: var(--vp-c-text-1);
  width: 100%;
  min-width: 0;
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

.pg-icon-btn .pg-icon {
  opacity: 1;
}

.pg-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
  flex: 0 0 auto;

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

.pg-results {
  font-size: 0.8rem;
  opacity: 0.55;
  white-space: nowrap;
  padding: 0 2px;
}

.pg-empty {
  margin-top: 14px;
  opacity: 0.8;
}

@media (max-width: 640px) {
  .pg-toolbar {
    flex-wrap: wrap;
    align-items: stretch;
    gap: 16px;
  }

  .pg-right {
    flex: 1 1 100%;
    width: 100%;
    align-items: flex-end;
    margin-left: 0;
    /* Stacked below the tags now, so a top divider marks the split instead. */
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
  }

  .pg-controls {
    justify-content: flex-end;
    width: 100%;
    gap: 8px;
  }

  .pg-pill,
  .pg-segment {
    padding-left: 10px;
    padding-right: 10px;
  }

  .pg-search-wrap.open {
    flex-basis: 100%;
  }

  .pg-search-wrap.open .pg-search {
    flex: 1 1 auto;
    max-width: none;
  }
}

/* light mode */
html:not(.dark) .pg-tag,
html:not(.dark) .pg-search,
html:not(.dark) .pg-icon-btn,
html:not(.dark) .pg-pill,
html:not(.dark) .pg-mode {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
}

html:not(.dark) .pg-segment + .pg-segment {
  border-left-color: rgba(0, 0, 0, 0.12);
}

html:not(.dark) .pg-right {
  border-color: rgba(0, 0, 0, 0.12);
}

html:not(.dark) .pg-clear {
  background: rgba(0, 0, 0, 0.04);
}

html:not(.dark) .pg-clear:hover {
  background: rgba(0, 0, 0, 0.07);
}

html:not(.dark) .pg-icon-btn.active {
  border-color: #2e7d32;
  background: rgba(46, 125, 50, 0.12);
  color: #2e7d32;
}
</style>
