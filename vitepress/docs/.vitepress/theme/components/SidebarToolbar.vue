<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'

const {
  sidebarCollapsed,
  foldersExpanded,
  scrollToActiveDoc,
  toggleAllFolders,
  toggleSidebarCollapsed,
} = useBlogUi()
</script>

<template>
  <div class="SidebarToolbar" role="toolbar" aria-label="侧边栏工具">
    <button
      type="button"
      class="tb-btn"
      title="定位到当前文档"
      aria-label="定位到当前文档"
      @click="scrollToActiveDoc"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v1.07a7.002 7.002 0 0 1 5.93 5.93H20a1 1 0 1 1 0 2h-1.07A7.002 7.002 0 0 1 13 18.93V20a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 5.07 13H4a1 1 0 1 1 0-2h1.07A7.002 7.002 0 0 1 11 4.07V3a1 1 0 0 1 1-1zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
      </svg>
    </button>
    <button
      type="button"
      class="tb-btn"
      :title="foldersExpanded ? '折叠全部分类' : '展开全部分类'"
      :aria-label="foldersExpanded ? '折叠全部分类' : '展开全部分类'"
      @click="toggleAllFolders"
    >
      <svg v-if="foldersExpanded" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M6 9h12v2H6V9zm0 4h12v2H6v-2z"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M6 9h12v2H6V9zm0 4h8v2H6v-2z"/>
      </svg>
    </button>
    <button
      type="button"
      class="tb-btn"
      :class="{ active: sidebarCollapsed }"
      :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
      :aria-label="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
      @click="toggleSidebarCollapsed"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm2 2v10h5V7H6zm7 0v10h5V7h-5z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.SidebarToolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
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

.tb-btn.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
</style>
