<script setup lang="ts">
import { withBase } from 'vitepress'

defineOptions({ name: 'SiteMapTree' })

export interface SiteMapItem {
  text?: string
  link?: string
  items?: SiteMapItem[]
}

defineProps<{
  items: SiteMapItem[]
  depth?: number
}>()
</script>

<template>
  <ul class="SiteMapTree" :style="{ '--map-depth': depth ?? 0 }">
    <li v-for="(item, index) in items" :key="item.link ?? `${item.text}-${index}`" class="SiteMapTree-node">
      <a
        v-if="item.link"
        class="SiteMapTree-link"
        :class="item.items?.length ? 'is-folder' : 'is-file'"
        :href="withBase(item.link)"
      >
        {{ item.text }}
      </a>
      <span v-else-if="item.text" class="SiteMapTree-label">{{ item.text }}</span>

      <SiteMapTree v-if="item.items?.length" :items="item.items" :depth="(depth ?? 0) + 1" />
    </li>
  </ul>
</template>

<style scoped>
.SiteMapTree {
  margin: 0;
  padding: 0 0 0 calc(var(--map-depth, 0) * 16px);
  list-style: none;
}

.SiteMapTree-node + .SiteMapTree-node {
  margin-top: 2px;
}

.SiteMapTree-link,
.SiteMapTree-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 24px;
}

.SiteMapTree-link {
  color: var(--yuque-text);
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}

.SiteMapTree-link::before {
  content: '';
  flex-shrink: 0;
  width: 13px;
  height: 13px;
  opacity: 0.55;
  background-color: currentColor;
  -webkit-mask: var(--vp-sidebar-icon-file) no-repeat center / contain;
  mask: var(--vp-sidebar-icon-file) no-repeat center / contain;
}

.SiteMapTree-link.is-folder::before {
  width: 16px;
  height: 16px;
  opacity: 0.95;
  background-color: var(--yuque-folder);
  -webkit-mask: var(--vp-sidebar-icon-folder) no-repeat center / contain;
  mask: var(--vp-sidebar-icon-folder) no-repeat center / contain;
}

.SiteMapTree-link:hover {
  background: var(--yuque-brand-soft);
  color: var(--yuque-brand);
}

.SiteMapTree-label {
  color: var(--yuque-text-secondary);
  font-weight: 600;
}

.SiteMapTree .SiteMapTree {
  margin-top: 2px;
  padding-left: 16px;
  border-left: 1px solid var(--yuque-border-light);
}
</style>
