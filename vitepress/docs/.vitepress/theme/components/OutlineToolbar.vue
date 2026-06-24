<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'

const { outlinePinned, toggleOutlinePinned } = useBlogUi()
</script>

<template>
  <div class="OutlineToolbar" role="toolbar" aria-label="文档目录工具">
    <span class="tb-label">文章目录</span>
    <button
      type="button"
      class="tb-btn"
      :class="{ active: outlinePinned }"
      :title="outlinePinned ? '取消固定' : '固定目录'"
      :aria-label="outlinePinned ? '取消固定' : '固定目录'"
      @click="toggleOutlinePinned"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M14 4h-4a1 1 0 0 0-1 1v.5H7.5a1 1 0 0 0-.7 1.7l3.3 3.3v5.5a1 1 0 0 0 1.7.7l2.3-2.3 2.3 2.3a1 1 0 0 0 1.7-.7v-5.5l3.3-3.3a1 1 0 0 0-.7-1.7H15V5a1 1 0 0 0-1-1z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.OutlineToolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tb-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
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
