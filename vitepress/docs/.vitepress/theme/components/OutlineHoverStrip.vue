<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'

const { outlinePinned } = useBlogUi()
</script>

<template>
  <div v-if="!outlinePinned" class="OutlineHoverStrip" aria-label="文章目录，移入展开">
    <div class="strip-hit" />
    <div class="strip-face">
      <span class="strip-lines" aria-hidden="true">━━━━</span>
      <span class="strip-label">文章目录</span>
    </div>
  </div>
</template>

<style scoped>
.OutlineHoverStrip {
  display: none;
}

@media (min-width: 1280px) {
  .OutlineHoverStrip {
    display: block;
    position: fixed;
    top: var(--vp-nav-height);
    right: 0;
    z-index: 200;
    width: var(--vp-outline-strip-width);
    height: calc(100vh - var(--vp-nav-height));
    pointer-events: auto;
  }

  /* 扩大感应区域（向左延伸） */
  .strip-hit {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(var(--vp-outline-strip-width) + 48px);
    height: 100%;
    cursor: pointer;
  }

  .strip-face {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: var(--vp-outline-strip-width);
    height: 100%;
    background: var(--yuque-sidebar-bg, var(--vp-c-bg-alt));
    border-left: 2px solid var(--yuque-border, var(--vp-c-divider));
    box-shadow: -3px 0 16px rgba(0, 0, 0, 0.06);
    transition: background-color 0.2s, border-color 0.2s;
  }

  .OutlineHoverStrip:hover .strip-face {
    background: var(--yuque-brand-soft, var(--vp-c-brand-soft));
    border-left-color: var(--yuque-brand, var(--vp-c-brand-1));
  }

  .strip-lines {
    display: block;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0;
    color: var(--yuque-brand, var(--vp-c-brand-1));
    opacity: 0.9;
    transform: scaleX(1.6);
    user-select: none;
    line-height: 1;
  }

  .strip-label {
    writing-mode: vertical-rl;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 5px;
    color: var(--vp-c-text-1);
    user-select: none;
  }

  .OutlineHoverStrip:hover .strip-label {
    color: var(--vp-c-brand-1);
  }
}

html.blog-outline-hover .OutlineHoverStrip .strip-face {
  opacity: 0;
  pointer-events: none;
}
</style>
