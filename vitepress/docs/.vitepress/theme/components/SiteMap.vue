<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { pages, tagIndex, type BlogPageMeta } from 'virtual:blog-meta'
import SiteMapTree, { type SiteMapItem } from './SiteMapTree.vue'

const route = useRoute()
const { theme } = useData()
const activeTag = ref('')

const topLinks = [
  { text: '首页', link: '/' },
  { text: '发布指南', link: '/guide/publish' },
] as const

const allTags = computed(() =>
  Object.keys(tagIndex).sort((a, b) => tagIndex[b].length - tagIndex[a].length || a.localeCompare(b, 'zh-CN')),
)

const filteredPages = computed<BlogPageMeta[]>(() => {
  if (!activeTag.value) return []
  return tagIndex[activeTag.value] ?? []
})

function normalizeSidebar(sidebar: unknown): SiteMapItem[] {
  if (!sidebar) return []
  if (Array.isArray(sidebar)) {
    if (sidebar.length > 0 && Array.isArray(sidebar[0])) {
      return (sidebar as SiteMapItem[][]).flat()
    }
    return sidebar as SiteMapItem[]
  }
  return []
}

function countLinks(items: SiteMapItem[]): number {
  return items.reduce((total, item) => {
    let count = item.link ? 1 : 0
    if (item.items?.length) count += countLinks(item.items)
    return total + count
  }, 0)
}

const sidebarItems = computed(() => normalizeSidebar(theme.value.sidebar))

const pageCount = computed(() => {
  const sidebarCount = countLinks(sidebarItems.value)
  return pages.length || sidebarCount + topLinks.length
})

function selectTag(tag: string) {
  activeTag.value = activeTag.value === tag ? '' : tag
  syncUrl()
}

function syncUrl() {
  const url = new URL(window.location.href)
  if (activeTag.value) url.searchParams.set('tag', activeTag.value)
  else url.searchParams.delete('tag')
  history.replaceState(null, '', url.toString())
}

function readTagFromUrl() {
  activeTag.value = new URL(window.location.href).searchParams.get('tag') ?? ''
}

function tagHref(tag: string) {
  return withBase(`/sitemap?tag=${encodeURIComponent(tag)}`)
}

function formatDate(ts?: number) {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(readTagFromUrl)
watch(() => route.path, readTagFromUrl)
watch(() => route.fullPath, readTagFromUrl)
</script>

<template>
  <div class="SiteMap">
    <p class="SiteMap-desc">
      共 <strong>{{ pageCount }}</strong> 篇文档、<strong>{{ allTags.length }}</strong> 个标签。
    </p>

    <section class="SiteMap-section">
      <h2 class="SiteMap-section-title">标签</h2>
      <div v-if="allTags.length" class="SiteMap-tags">
        <a
          v-for="tag in allTags"
          :key="tag"
          class="SiteMap-tag"
          :class="{ active: activeTag === tag }"
          :href="tagHref(tag)"
          @click.prevent="selectTag(tag)"
        >
          {{ tag }}
          <span class="SiteMap-tag-count">{{ tagIndex[tag].length }}</span>
        </a>
      </div>
      <p v-else class="SiteMap-empty">暂无标签，可在文档 frontmatter 中添加 <code>tags</code> 字段。</p>

      <ul v-if="activeTag && filteredPages.length" class="SiteMap-tag-list">
        <li v-for="page in filteredPages" :key="page.path" class="SiteMap-tag-item">
          <a class="SiteMap-tag-link" :href="withBase(page.path)">{{ page.title }}</a>
          <span v-if="page.lastUpdated" class="SiteMap-tag-date">{{ formatDate(page.lastUpdated) }}</span>
        </li>
      </ul>
    </section>

    <section class="SiteMap-section">
      <h2 class="SiteMap-section-title">站点入口</h2>
      <ul class="SiteMapList root">
        <li v-for="item in topLinks" :key="item.link" class="SiteMapNode">
          <a class="SiteMapLink is-file" :href="withBase(item.link)">{{ item.text }}</a>
        </li>
      </ul>
    </section>

    <section v-for="(section, index) in sidebarItems" :key="section.text ?? index" class="SiteMap-section">
      <h2 v-if="section.text" class="SiteMap-section-title">
        <a v-if="section.link" class="SiteMapSectionLink" :href="withBase(section.link)">
          {{ section.text }}
        </a>
        <span v-else>{{ section.text }}</span>
      </h2>
      <SiteMapTree v-if="section.items?.length" :items="section.items" :depth="0" />
      <ul v-else-if="section.link" class="SiteMapList root">
        <li class="SiteMapNode">
          <a class="SiteMapLink is-file" :href="withBase(section.link)">{{ section.text }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.SiteMap-desc {
  margin: 0 0 28px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--yuque-text-secondary);
}

.SiteMap-desc strong {
  color: var(--yuque-brand);
  font-weight: 600;
}

.SiteMap-section + .SiteMap-section {
  margin-top: 28px;
}

.SiteMap-section-title {
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--yuque-border-light);
  font-size: 18px;
  font-weight: 600;
  color: var(--yuque-text);
}

.SiteMapSectionLink {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.SiteMapSectionLink:hover {
  color: var(--yuque-brand);
}

.SiteMap-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.SiteMap-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--yuque-border-light);
  border-radius: 999px;
  background: var(--yuque-paper-bg);
  color: var(--yuque-text);
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}

.SiteMap-tag:hover,
.SiteMap-tag.active {
  border-color: var(--yuque-brand);
  background: var(--yuque-brand-soft);
  color: var(--yuque-brand);
}

.SiteMap-tag-count {
  font-size: 12px;
  opacity: 0.75;
}

.SiteMap-empty {
  margin: 0;
  color: var(--yuque-text-secondary);
}

.SiteMap-tag-list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 16px;
}

.SiteMap-tag-item {
  padding: 8px 0;
  border-bottom: 1px solid var(--yuque-border-light);
}

.SiteMap-tag-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--yuque-text);
  text-decoration: none;
}

.SiteMap-tag-link:hover {
  color: var(--yuque-brand);
}

.SiteMap-tag-date {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: var(--yuque-text-secondary);
}

.SiteMapList {
  margin: 0;
  padding: 0;
  list-style: none;
}

.SiteMapList.root {
  display: grid;
  gap: 4px;
}

.SiteMapNode {
  margin: 0;
}

.SiteMapLink {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 24px;
  color: var(--yuque-text);
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}

.SiteMapLink::before {
  content: '';
  flex-shrink: 0;
  width: 13px;
  height: 13px;
  opacity: 0.55;
  background-color: currentColor;
  -webkit-mask: var(--vp-sidebar-icon-file) no-repeat center / contain;
  mask: var(--vp-sidebar-icon-file) no-repeat center / contain;
}

.SiteMapLink.is-folder::before {
  width: 16px;
  height: 16px;
  opacity: 0.95;
  background-color: var(--yuque-folder);
  -webkit-mask: var(--vp-sidebar-icon-folder) no-repeat center / contain;
  mask: var(--vp-sidebar-icon-folder) no-repeat center / contain;
}

.SiteMapLink:hover {
  background: var(--yuque-brand-soft);
  color: var(--yuque-brand);
}

@media (max-width: 767px) {
  .SiteMap-tag-list {
    grid-template-columns: 1fr;
  }
}
</style>
