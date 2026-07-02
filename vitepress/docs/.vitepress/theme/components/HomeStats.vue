<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { pages, tagIndex } from 'virtual:blog-meta'

const recentPages = computed(() =>
  [...pages]
    .filter((page) => page.lastUpdated)
    .sort((a, b) => (b.lastUpdated ?? 0) - (a.lastUpdated ?? 0))
    .slice(0, 5),
)

const tagCount = computed(() => Object.keys(tagIndex).length)

function formatRelative(ts?: number) {
  if (!ts) return ''
  const diff = Date.now() - ts
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days <= 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 30) return `${days} 天前`
  return new Date(ts).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <section class="HomeStats">
    <div class="HomeStats-grid">
      <article class="HomeStats-card accent-docs">
        <p class="HomeStats-value">{{ pages.length }}</p>
        <p class="HomeStats-label">篇文档</p>
      </article>
      <article class="HomeStats-card accent-tags">
        <p class="HomeStats-value">{{ tagCount }}</p>
        <p class="HomeStats-label">个标签</p>
      </article>
      <article class="HomeStats-card wide">
        <p class="HomeStats-label recent-title">最近更新</p>
        <ul v-if="recentPages.length" class="HomeStats-recent">
          <li v-for="page in recentPages" :key="page.path">
            <a :href="withBase(page.path)">{{ page.title }}</a>
            <span>{{ formatRelative(page.lastUpdated) }}</span>
          </li>
        </ul>
        <p v-else class="HomeStats-empty">暂无更新记录</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.HomeStats {
  width: 100%;
  max-width: 960px;
  margin: 0 auto 8px;
  padding: 0 24px;
  box-sizing: border-box;
}

.HomeStats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.HomeStats-card {
  position: relative;
  overflow: hidden;
  padding: 22px 24px;
  border: 1px solid rgba(0, 185, 107, 0.15);
  border-radius: 16px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.78) 100%);
  box-shadow:
    0 8px 32px rgba(0, 185, 107, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(12px);
}

.HomeStats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--yuque-brand), #26c07d, #00d4aa);
}

.HomeStats-card.wide {
  grid-column: 1 / -1;
}

.HomeStats-value {
  margin: 4px 0 0;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--yuque-brand) 0%, #00d4aa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.HomeStats-label {
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--yuque-text-secondary);
}

.recent-title {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 700;
  color: var(--yuque-text);
}

.HomeStats-recent {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 20px;
}

.HomeStats-recent li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px solid var(--yuque-border-light);
  font-size: 14px;
}

.HomeStats-recent a {
  color: var(--yuque-text);
  text-decoration: none;
  transition: color 0.2s;
}

.HomeStats-recent a:hover {
  color: var(--yuque-brand);
}

.HomeStats-recent span {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--yuque-text-secondary);
}

.HomeStats-empty {
  margin: 0;
  font-size: 13px;
  color: var(--yuque-text-secondary);
}

.dark .HomeStats-card {
  border-color: rgba(58, 173, 134, 0.2);
  background:
    linear-gradient(145deg, rgba(46, 47, 53, 0.92) 0%, rgba(44, 45, 50, 0.82) 100%);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(58, 173, 134, 0.08);
}

@media (max-width: 767px) {
  .HomeStats-recent {
    grid-template-columns: 1fr;
  }
}
</style>
