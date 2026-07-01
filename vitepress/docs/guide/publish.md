---
title: 发布指南
order: 1
---

# 在 GitHub 发布新文章

本站内容即 `vitepress/docs/` 目录下的 Markdown 文件。**你不需要改任何配置文件**，只要按约定写好文件，侧栏和页面会自动生成。

## 快速开始

### 1. 新建一篇文章

在 GitHub 网页或本地，于对应分类目录下创建 `.md` 文件，例如：

```
vitepress/docs/dev/my-new-note.md
```

文件头部写上 frontmatter：

```yaml
---
title: 我的新笔记
order: 10
---
```

正文用标准 Markdown 书写即可。保存并推送到 `master` 分支。

### 2. 自动构建

推送后，GitHub Actions（`.github/workflows/deploy.yml`）会自动构建并部署到 Pages。

本地验证构建：

```bash
cd vitepress && npm run docs:build
```

### 3. 访问站点

https://xiaobawang001.github.io/blog/

---

## 目录结构约定

```
vitepress/docs/
├── index.md              # 首页（不进侧栏）
├── dev/
│   ├── index.md          # 分类名：开发笔记
│   └── setup.md          # 文章
└── learning/
    ├── index.md
    └── writing-habits.md
```

| 文件类型 | 作用 |
|----------|------|
| `分类/index.md` | 定义侧栏里该文件夹的显示名称 |
| `*.md` 文章 | 实际页面，需 `title` 和 `order` |

## Frontmatter 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 侧栏与页面标题 |
| `order` | 建议 | 数字越小越靠前 |
| `date` | 否 | 可选写作日期 |

## 常见问题

**Q：推送后页面没更新？**

- 打开 GitHub **Actions**，确认 workflow 成功
- 首次部署需在 **Settings → Pages → Source** 选 **GitHub Actions**

**Q：新文章不在侧栏？**

- 确认文件在 `vitepress/docs/` 下，且有 `title` frontmatter

**Q：本地预览？**

```bash
cd vitepress && npm run docs:dev
```
