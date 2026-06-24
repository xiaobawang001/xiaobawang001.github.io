---
title: 为何选 VitePress
order: 1
---

# 为何选 VitePress

> 2025-06-18

个人笔记站最终选用 VitePress，主要考虑：

- **写作简单**：纯 Markdown + frontmatter，无需维护手写侧栏
- **阅读体验好**：默认主题适合技术文档，可定制成语雀风格
- **生态现代**：基于 Vite，本地预览快，与 Vue 组件兼容
- **部署轻量**：`npm run docs:build` 输出静态文件，适合 GitCode Pages

本仓库仅保留 VitePress 方案，笔记内容在 `vitepress/docs/` 目录下管理。
