<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useFocusMode } from '../composables/use-focus-mode'
import { Eye } from '@lucide/vue'

const { frontmatter, page } = useData()
const { focusMode, toggleFocusMode } = useFocusMode()
const visible = computed(() => { if (page.value.isNotFound) return false; const l = frontmatter.value.layout; return !l || l === 'doc' })
</script>

<template>
  <div v-if="visible" class="NavFocusModeControl nav-ctrl">
    <el-tooltip :content="focusMode ? '退出专注模式' : '专注模式（隐藏侧栏与目录）'" :show-after="400">
      <el-button text size="small" :type="focusMode ? 'primary' : undefined" @click="toggleFocusMode">
        <Eye :size="18" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<style scoped>
.nav-ctrl { display: none; align-items: center; margin-left: 6px; padding-left: 10px; border-left: 1px solid var(--vp-c-divider); }
@media (min-width: 768px) { .nav-ctrl { display: flex; } }
</style>
