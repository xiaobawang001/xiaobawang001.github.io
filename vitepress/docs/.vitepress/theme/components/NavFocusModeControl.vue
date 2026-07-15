<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useFocusMode } from '../composables/use-focus-mode'
import { Eye } from 'lucide-vue-next'

const { frontmatter, page } = useData()
const { focusMode, toggleFocusMode } = useFocusMode()

const visible = computed(() => {
  if (page.value.isNotFound) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc'
})
</script>

<template>
  <div v-if="visible" class="NavFocusModeControl" role="group" aria-label="专注模式">
    <button
      type="button"
      class="nav-icon-btn"
      :class="{ active: focusMode }"
      :title="focusMode ? '退出专注模式' : '专注模式（隐藏侧栏与目录）'"
      :aria-label="focusMode ? '退出专注模式' : '开启专注模式'"
      :aria-pressed="focusMode"
      @click="toggleFocusMode"
    >
      <Eye :size="18" />
    </button>
  </div>
</template>

<style scoped>
.NavFocusModeControl {
  display: none;
  align-items: center;
  margin-left: 6px;
  padding-left: 10px;
  border-left: 1px solid var(--vp-c-divider);
}

@media (min-width: 768px) {
  .NavFocusModeControl {
    display: flex;
  }
}

.nav-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.nav-icon-btn:hover,
.nav-icon-btn.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
</style>
