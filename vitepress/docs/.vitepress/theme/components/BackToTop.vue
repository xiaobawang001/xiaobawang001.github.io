<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'
import { ArrowUp } from 'lucide-vue-next'

const { frontmatter, page } = useData()
const show = ref(false)

const visible = computed(() => {
  if (page.value.isNotFound) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc'
})

function onScroll() {
  show.value = window.scrollY > 320
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <button
    v-if="visible"
    type="button"
    class="BackToTop"
    :class="{ show }"
    title="回到顶部"
    aria-label="回到顶部"
    @click="scrollToTop"
  >
    <ArrowUp :size="18" />
  </button>
</template>

<style scoped>
.BackToTop {
  position: fixed;
  right: 24px;
  bottom: 32px;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--yuque-border-light);
  border-radius: 8px;
  background: var(--yuque-paper-bg);
  color: var(--yuque-text-secondary);
  box-shadow: var(--yuque-shadow-paper);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition:
    opacity 0.2s,
    visibility 0.2s,
    transform 0.2s,
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
}

.BackToTop.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.BackToTop:hover {
  background: var(--yuque-brand-soft);
  border-color: var(--yuque-brand);
  color: var(--yuque-brand);
}

@media (max-width: 959px) {
  .BackToTop {
    right: 16px;
    bottom: 24px;
  }
}
</style>
