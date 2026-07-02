<script setup lang="ts">
import { withBase } from 'vitepress'

function openSearch() {
  window.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }),
  )
}
</script>

<template>
  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">页面不存在</h1>
    <p class="desc">你访问的链接可能已失效，或页面已被移动。</p>
    <div class="actions">
      <a class="btn primary" :href="withBase('/')">返回首页</a>
      <button type="button" class="btn" @click="openSearch">搜索文档</button>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 72px 24px 120px;
  text-align: center;
}

.code {
  margin: 0;
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  color: var(--yuque-brand);
}

.title {
  margin: 16px 0 8px;
  font-size: 22px;
  font-weight: 600;
  color: var(--yuque-text);
}

.desc {
  margin: 0 auto;
  max-width: 360px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--yuque-text-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 40px;
  padding: 0 20px;
  border: 1px solid var(--yuque-border);
  border-radius: 8px;
  background: var(--yuque-paper-bg);
  color: var(--yuque-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.btn:hover {
  border-color: var(--yuque-brand);
  color: var(--yuque-brand);
}

.btn.primary {
  border-color: var(--yuque-brand);
  background: var(--yuque-brand);
  color: #fff;
}

.btn.primary:hover {
  border-color: var(--yuque-brand-hover);
  background: var(--yuque-brand-hover);
  color: #fff;
}
</style>
