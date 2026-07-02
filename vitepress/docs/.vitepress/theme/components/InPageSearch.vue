<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  clearInPageSearch,
  getCurrentMatchIndex,
  getMatchCount,
  gotoNextMatch,
  gotoPrevMatch,
  runInPageSearch,
} from '../composables/in-page-search'

const { frontmatter, page } = useData()
const route = useRoute()

const open = ref(false)
const query = ref('')
const matchCount = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const visible = computed(() => {
  if (page.value.isNotFound) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc'
})

const counterText = computed(() => {
  if (!query.value.trim()) return ''
  if (!matchCount.value) return '无匹配'
  return `${getCurrentMatchIndex()} / ${matchCount.value}`
})

function refreshSearch() {
  matchCount.value = runInPageSearch(query.value)
}

function openPanel() {
  open.value = true
  requestAnimationFrame(() => inputRef.value?.focus())
}

function closePanel() {
  open.value = false
  query.value = ''
  clearInPageSearch()
  matchCount.value = 0
}

function onKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'f') {
    event.preventDefault()
    if (open.value) closePanel()
    else openPanel()
    return
  }
  if (!open.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closePanel()
    return
  }
  if (event.key === 'Enter') {
    event.preventDefault()
    if (event.shiftKey) gotoPrevMatch()
    else gotoNextMatch()
    matchCount.value = getMatchCount()
  }
}

watch(query, () => refreshSearch())
watch(() => route.path, () => closePanel())

onMounted(() => {
  document.addEventListener('keydown', onKeydown, true)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown, true)
  clearInPageSearch()
})
</script>

<template>
  <div v-if="visible" class="InPageSearch">
    <button
      type="button"
      class="InPageSearch-trigger"
      :class="{ active: open }"
      title="文内搜索 (Ctrl+Shift+F)"
      aria-label="文内搜索"
      @click="open ? closePanel() : openPanel()"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
    </button>

    <div v-show="open" class="InPageSearch-panel" role="search" aria-label="文内搜索">
      <input
        ref="inputRef"
        v-model="query"
        class="InPageSearch-input"
        type="search"
        placeholder="搜索当前页…"
        aria-label="搜索当前页内容"
      />
      <span class="InPageSearch-counter">{{ counterText }}</span>
      <button type="button" class="InPageSearch-btn" title="上一个 (Shift+Enter)" @click="gotoPrevMatch">↑</button>
      <button type="button" class="InPageSearch-btn" title="下一个 (Enter)" @click="gotoNextMatch">↓</button>
      <button type="button" class="InPageSearch-btn close" title="关闭 (Esc)" @click="closePanel">×</button>
    </div>
  </div>
</template>

<style scoped>
.InPageSearch {
  position: fixed;
  right: 24px;
  bottom: 84px;
  z-index: 45;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.InPageSearch-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--yuque-border-light);
  border-radius: 8px;
  background: var(--yuque-paper-bg);
  color: var(--yuque-text-secondary);
  box-shadow: var(--yuque-shadow-paper);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.InPageSearch-trigger:hover,
.InPageSearch-trigger.active {
  background: var(--yuque-brand-soft);
  border-color: var(--yuque-brand);
  color: var(--yuque-brand);
}

.InPageSearch-panel {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid var(--yuque-border-light);
  border-radius: 10px;
  background: var(--yuque-paper-bg);
  box-shadow: var(--yuque-shadow-paper);
}

.InPageSearch-input {
  width: 180px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--yuque-border);
  border-radius: 6px;
  background: var(--yuque-page-bg);
  color: var(--yuque-text);
  font-size: 14px;
  outline: none;
}

.InPageSearch-input:focus {
  border-color: var(--yuque-brand);
  box-shadow: 0 0 0 2px var(--yuque-brand-soft);
}

.InPageSearch-counter {
  min-width: 52px;
  font-size: 12px;
  color: var(--yuque-text-secondary);
  text-align: center;
}

.InPageSearch-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--yuque-text-secondary);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}

.InPageSearch-btn:hover {
  background: var(--yuque-brand-soft);
  color: var(--yuque-brand);
}

.InPageSearch-btn.close {
  font-size: 18px;
}

@media (max-width: 767px) {
  .InPageSearch {
    right: 16px;
    bottom: 76px;
  }

  .InPageSearch-input {
    width: 140px;
  }
}
</style>
