<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'

const { outlineExpanded, toggleOutline } = useBlogUi()
</script>

<template>
  <div class="OutlineToolbar" role="toolbar" aria-label="文章目录工具">
    <div class="tb-left">
      <span class="tb-label">文章目录</span>
    </div>
    <div class="tb-actions">
      <button
        type="button"
        class="tb-btn"
        :title="outlineExpanded ? '折叠目录' : '展开目录'"
        :aria-label="outlineExpanded ? '折叠目录' : '展开目录'"
        @click="toggleOutline"
      >
        <ChevronUp v-if="outlineExpanded" class="tb-icon" :size="16" />
        <ChevronDown v-else class="tb-icon" :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.OutlineToolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  min-height: 32px;
}

.tb-left {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.tb-label {
  font-size: 16px;
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
}
</style>
