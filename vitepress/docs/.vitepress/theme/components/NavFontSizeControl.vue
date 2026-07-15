<script setup lang="ts">
import { computed } from 'vue'
import { useFontSize } from '../composables/use-font-size'
import { Type } from '@lucide/vue'

const { fontSizeIndex, cycleFontSize } = useFontSize()
const label = computed(() => ['小', '中', '大'][fontSizeIndex.value] ?? '中')
</script>

<template>
  <div class="NavFontSizeControl nav-ctrl">
    <el-tooltip :content="`字号：${label}（点击切换）`" :show-after="400">
      <el-button text size="small" @click="cycleFontSize">
        <Type :size="15" />
        <span class="ctrl-badge">{{ label }}</span>
      </el-button>
    </el-tooltip>
  </div>
</template>

<style scoped>
.nav-ctrl { display: none; align-items: center; margin-left: 6px; padding-left: 10px; border-left: 1px solid var(--vp-c-divider); }
@media (min-width: 768px) { .nav-ctrl { display: flex; } }
.ctrl-badge { font-size: 11px; font-weight: 600; opacity: 0.85; }
</style>
