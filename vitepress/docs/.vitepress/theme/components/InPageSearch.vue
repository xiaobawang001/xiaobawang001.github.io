<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { Search, ArrowUp, ArrowDown, X } from '@lucide/vue'
import { clearInPageSearch, getCurrentMatchIndex, getMatchCount, gotoNextMatch, gotoPrevMatch, runInPageSearch } from '../composables/in-page-search'

const { frontmatter, page } = useData()
const route = useRoute()
const open = ref(false)
const query = ref('')
const matchCount = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const visible = computed(() => { if (page.value.isNotFound) return false; const l = frontmatter.value.layout; return !l || l === 'doc' })
const counterText = computed(() => { if (!query.value.trim()) return ''; if (!matchCount.value) return '无匹配'; return `${getCurrentMatchIndex()} / ${matchCount.value}` })
function refreshSearch() { matchCount.value = runInPageSearch(query.value) }
function openPanel() { open.value = true; requestAnimationFrame(() => inputRef.value?.focus()) }
function closePanel() { open.value = false; query.value = ''; clearInPageSearch(); matchCount.value = 0 }
function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') { e.preventDefault(); if (open.value) closePanel(); else openPanel(); return }
  if (!open.value) return
  if (e.key === 'Escape') { e.preventDefault(); closePanel(); return }
  if (e.key === 'Enter') { e.preventDefault(); if (e.shiftKey) gotoPrevMatch(); else gotoNextMatch(); matchCount.value = getMatchCount() }
}
watch(query, () => refreshSearch())
watch(() => route.path, () => closePanel())
onMounted(() => { document.addEventListener('keydown', onKeydown, true) })
onUnmounted(() => { document.removeEventListener('keydown', onKeydown, true); clearInPageSearch() })
</script>

<template>
  <div v-if="visible" class="InPageSearch">
    <el-tooltip content="文内搜索 (Ctrl+Shift+F)" :show-after="400">
      <el-button class="isp-trigger" :class="{ active: open }" @click="open ? closePanel() : openPanel()">
        <Search :size="18" />
      </el-button>
    </el-tooltip>
    <div v-show="open" class="isp-panel" role="search" aria-label="文内搜索">
      <el-input ref="inputRef" v-model="query" size="small" placeholder="搜索当前页…" clearable class="isp-input" />
      <span class="isp-counter">{{ counterText }}</span>
      <el-button text circle size="small" class="isp-btn" @click="gotoPrevMatch"><ArrowUp :size="16" /></el-button>
      <el-button text circle size="small" class="isp-btn" @click="gotoNextMatch"><ArrowDown :size="16" /></el-button>
      <el-button text circle size="small" class="isp-btn" @click="closePanel"><X :size="16" /></el-button>
    </div>
  </div>
</template>

<style scoped>
.InPageSearch { position: fixed; right: 24px; bottom: 84px; z-index: 45; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.isp-trigger {
  width: 40px; height: 40px;
  border: 1px solid var(--yuque-border-light);
  border-radius: 8px;
  background: var(--yuque-paper-bg);
  color: var(--yuque-text-secondary);
  box-shadow: var(--yuque-shadow-paper);
}
.isp-trigger:hover, .isp-trigger.active {
  background: var(--yuque-brand-soft);
  border-color: var(--yuque-brand);
  color: var(--yuque-brand);
}
.isp-panel { display: flex; align-items: center; gap: 6px; padding: 8px 10px; border: 1px solid var(--yuque-border-light); border-radius: 10px; background: var(--yuque-paper-bg); box-shadow: var(--yuque-shadow-paper); }
.isp-input { width: 180px; }
.isp-counter { min-width: 52px; font-size: 12px; color: var(--yuque-text-secondary); text-align: center; }
.isp-btn { width: 28px; height: 28px; }
@media (max-width: 767px) { .InPageSearch { right: 16px; bottom: 76px; } .isp-input { width: 140px; } }
</style>
