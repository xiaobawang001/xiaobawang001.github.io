<script setup lang="ts">
import { computed } from 'vue'
import { useContentWidth } from '../composables/use-content-width'

const { contentWidthIndex, cycleContentWidth } = useContentWidth()

const label = computed(() => ['窄', '中', '宽'][contentWidthIndex.value] ?? '中')
</script>

<template>
  <div class="NavContentWidthControl" role="group" aria-label="阅读宽度">
    <button
      type="button"
      class="nav-icon-btn"
      :title="`阅读宽度：${label}（点击切换）`"
      :aria-label="`阅读宽度 ${label}，点击切换`"
      @click="cycleContentWidth"
    >
      <span class="width-icon" aria-hidden="true">↔</span>
      <span class="width-badge">{{ label }}</span>
    </button>
  </div>
</template>

<style scoped>
.NavContentWidthControl {
  display: none;
  align-items: center;
  margin-left: 6px;
  padding-left: 10px;
  border-left: 1px solid var(--vp-c-divider);
}

@media (min-width: 768px) {
  .NavContentWidthControl {
    display: flex;
  }
}

.nav-icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.nav-icon-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.width-icon {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.width-badge {
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  opacity: 0.85;
}
</style>
