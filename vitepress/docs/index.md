---
layout: home

hero:
  name: 我的笔记
  text: 像语雀一样书写与阅读
  tagline: 在 GitCode 新建 Markdown，推送后 CI 自动构建发布；侧栏目录随文件夹结构自动生成
  actions:
    - theme: brand
      text: 开始阅读
      link: /dev/setup
    - theme: alt
      text: 如何发布文章
      link: /guide/publish

features:
  - title: 语雀风阅读体验
    details: 灰底白纸、舒适字号与行高，左侧知识库树 + 右侧文章目录，专注阅读
  - title: 目录全自动
    details: 按文件夹组织笔记，写好 title 和 order 即可；无需手写侧边栏配置
  - title: GitCode 一键发布
    details: 推送代码触发 CI 流水线，自动构建并部署到 GitCode Pages
---

## 关于本站

这是我的个人知识库，用 Markdown 记录学习心得与开发笔记。

**写作流程**：在 GitCode 仓库的 `vitepress/docs/` 目录下新建或编辑 Markdown → 推送到 `master` → CI 自动构建发布。详见 [发布指南](/guide/publish)。
