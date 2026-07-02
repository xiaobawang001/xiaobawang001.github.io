<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { renderGraphvizDiagrams } from '../composables/use-graphviz'

const { page, frontmatter } = useData()
const route = useRoute()

function shouldRender() {
  if (page.value.isNotFound) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc' || layout === 'page'
}

async function render() {
  if (!shouldRender()) return
  await nextTick()
  await renderGraphvizDiagrams()
}

onMounted(() => {
  void render()
})

watch(() => route.path, () => {
  void render()
})
</script>

<template>
  <span class="GraphvizRender" aria-hidden="true" />
</template>
