<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'
import { FileText, LocateFixed, ChevronUp, ChevronDown } from 'lucide-vue-next'

const { foldersExpanded, scrollToActiveDoc, toggleAllFolders } = useBlogUi()
</script>

<template>
  <div class="SidebarToolbar" role="toolbar" aria-label="侧边栏工具">
    <div class="tb-left">
      <FileText class="tb-icon" :size="16" />
      <span class="tb-label">文档目录</span>
    </div>
    <div class="tb-actions">
      <button
        type="button"
        class="tb-btn"
        title="定位到当前文档"
        aria-label="定位到当前文档"
        @click="scrollToActiveDoc"
      >
        <LocateFixed class="tb-icon" :size="16" />
      </button>
      <button
        type="button"
        class="tb-btn"
        :title="foldersExpanded ? '折叠全部分类' : '展开全部分类'"
        :aria-label="foldersExpanded ? '折叠全部分类' : '展开全部分类'"
        @click="toggleAllFolders"
      >
        <ChevronUp v-if="foldersExpanded" class="tb-icon" :size="16" />
        <ChevronDown v-else class="tb-icon" :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.SidebarToolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 calc(-1 * var(--vp-sidebar-padding-x));
  padding: 0 var(--vp-sidebar-padding-x);
  border-bottom: 1px solid var(--vp-c-divider);
  background: transparent;
  box-sizing: border-box;
  min-height: 40px;
  flex-shrink: 0;
}

.tb-left {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.tb-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.tb-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.tb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.tb-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.tb-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  flex-shrink: 0;
}
</style>
