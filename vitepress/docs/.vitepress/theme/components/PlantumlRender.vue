<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { renderPlantumlDiagrams } from '../composables/use-plantuml'

const { isDark, page, frontmatter } = useData()
const route = useRoute()

function shouldRender() {
  if (page.value.isNotFound) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc' || layout === 'page'
}

async function render() {
  if (!shouldRender()) return
  await nextTick()
  await renderPlantumlDiagrams(isDark.value)
}

onMounted(() => {
  void render()
})

watch(() => route.path, () => {
  void render()
})

watch(isDark, () => {
  void render()
})
</script>

<template>
  <span class="PlantumlRender" aria-hidden="true" />
</template>
