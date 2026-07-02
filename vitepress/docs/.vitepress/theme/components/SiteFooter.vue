<script setup lang="ts">
const GITHUB_REPO = 'https://github.com/xiaobawang001/blog'
const buildTime = __BUILD_TIME__
</script>

<template>
  <footer class="SiteFooter">
    <div class="footer-inner">
      <span class="footer-copy">© {{ new Date().getFullYear() }}</span>
      <span class="footer-sep">·</span>
      <a class="footer-link" :href="GITHUB_REPO" target="_blank" rel="noopener noreferrer">GitHub</a>
      <span class="footer-sep">·</span>
      <span class="footer-meta">构建于 {{ buildTime }}</span>
    </div>
  </footer>
</template>

<style scoped>
.SiteFooter {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px 8px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--yuque-text-secondary);
}

.footer-link {
  color: var(--yuque-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--yuque-brand);
}

.footer-sep {
  opacity: 0.5;
}

.footer-meta {
  opacity: 0.85;
}

@media (max-width: 767px) {
  .footer-inner {
    font-size: 12px;
  }
}
</style>
