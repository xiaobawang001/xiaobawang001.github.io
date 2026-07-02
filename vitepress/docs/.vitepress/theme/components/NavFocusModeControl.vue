<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useFocusMode } from '../composables/use-focus-mode'

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
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"
        />
      </svg>
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
