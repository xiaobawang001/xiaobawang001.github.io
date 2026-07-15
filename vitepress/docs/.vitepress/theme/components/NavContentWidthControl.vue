<script setup lang="ts">
import { computed } from 'vue'
import { useContentWidth } from '../composables/use-content-width'
import { Maximize2 } from '@lucide/vue'

const { contentWidthIndex, cycleContentWidth } = useContentWidth()
const label = computed(() => ['窄', '中', '宽'][contentWidthIndex.value] ?? '中')
</script>

<template>
  <div class="NavContentWidthControl nav-ctrl">
    <el-tooltip :content="`阅读宽度：${label}（点击切换）`" :show-after="400">
      <el-button text size="small" @click="cycleContentWidth">
        <Maximize2 :size="15" />
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
