<script setup lang="ts">
import { computed } from 'vue'
import { useFontSize } from '../composables/use-font-size'
import { Type } from 'lucide-vue-next'

const { fontSizeIndex, cycleFontSize } = useFontSize()

const label = computed(() => ['小', '中', '大'][fontSizeIndex.value] ?? '中')
</script>

<template>
  <div class="NavFontSizeControl" role="group" aria-label="正文字号">
    <button
      type="button"
      class="nav-icon-btn"
      :title="`字号：${label}（点击切换）`"
      :aria-label="`正文字号 ${label}，点击切换`"
      @click="cycleFontSize"
    >
      <Type class="font-icon" :size="15" />
      <span class="font-badge">{{ label }}</span>
    </button>
  </div>
</template>

<style scoped>
.NavFontSizeControl {
  display: none;
  align-items: center;
  margin-left: 6px;
  padding-left: 10px;
  border-left: 1px solid var(--vp-c-divider);
}

@media (min-width: 768px) {
  .NavFontSizeControl {
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

.font-icon {
  display: inline-flex;
}

.font-badge {
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  opacity: 0.85;
}
</style>
