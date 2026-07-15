<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { getRelatedArticles } from '../composables/use-related-articles'

const route = useRoute()
const { frontmatter, page } = useData()

const visible = computed(() => {
  if (page.value.isNotFound) return false
  if (frontmatter.value.relatedArticles === false) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc'
})

const related = computed(() => getRelatedArticles(route.path, 5))
</script>

<template>
  <section v-if="visible && related.length" class="RelatedArticles">
    <h2 class="RelatedArticles-title">相关阅读</h2>
    <ul class="RelatedArticles-list">
      <li v-for="item in related" :key="item.path">
        <a :href="withBase(item.path)">{{ item.title }}</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.RelatedArticles {
  margin: 40px 0 0;
  padding-top: 24px;
  border-top: 1px solid var(--yuque-border-light);
}

.RelatedArticles-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--yuque-text);
}

.RelatedArticles-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 16px;
}

.RelatedArticles-list a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  color: var(--yuque-text);
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}

.RelatedArticles-list a::before {
  content: '';
  width: 13px;
  height: 13px;
  opacity: 0.55;
  background-color: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3C/svg%3E") no-repeat center / contain;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3C/svg%3E") no-repeat center / contain;
}

.RelatedArticles-list a:hover {
  background: var(--yuque-brand-soft);
  color: var(--yuque-brand);
}

@media (max-width: 767px) {
  .RelatedArticles-list {
    grid-template-columns: 1fr;
  }
}
</style>
