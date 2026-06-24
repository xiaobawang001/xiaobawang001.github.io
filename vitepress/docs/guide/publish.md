---
title: 发布指南
order: 1
---

# 在 GitCode 发布新文章

本站内容即 `vitepress/docs/` 目录下的 Markdown 文件。**你不需要改任何配置文件**，只要按约定写好文件，侧栏和页面会自动生成。

## 快速开始

### 1. 新建一篇文章

在 GitCode 网页或本地，于对应分类目录下创建 `.md` 文件，例如：

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

正文用标准 Markdown 书写即可。保存并推送到 `master` 或 `main` 分支。

### 2. 自动构建

推送后，GitCode CI 流水线（`.gitlab-ci.yml`）会自动：

1. 安装依赖并执行 `npm run docs:build`
2. 将构建产物部署到 GitCode Pages

本地也可先验证构建：

```bash
./scripts/deploy-gitcode.sh
```

手动推送静态文件（备选）：

```bash
export GITCODE_USER=你的用户名
./scripts/deploy-gitcode.sh --push
```

### 3. 访问站点

https://\<你的用户名\>.gitcode.io/\<仓库名\>/

默认仓库名为 `blog`，即 `https://你的用户名.gitcode.io/blog/`

---

## 目录结构约定

```
vitepress/docs/
├── index.md              # 首页（不进侧栏）
├── dev/
│   ├── index.md          # 分类名：开发笔记
│   ├── setup.md          # 文章
│   └── docker/
│       ├── index.md      # 子分类：docker笔记
│       └── setup.md
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
| `order` | 建议 | 数字越小越靠前，同目录内排序 |
| `date` | 否 | 可选，用于记录写作日期 |

### 分类 index 示例

```yaml
---
title: 开发笔记
order: 1
---
```

### 文章示例

```yaml
---
title: Docker 入门
order: 2
date: 2025-06-24
---

# Docker 入门

正文内容……
```

## 新建分类

1. 在 `docs/` 下新建文件夹
2. 在其中创建 `index.md` 并写好 `title`
3. 在同目录下添加文章 `.md` 文件
4. 推送后侧栏自动出现新分类

## 常见问题

**Q：推送后页面没更新？**

- 进入 GitCode 项目「构建 → 流水线」，确认 `pages` 任务成功
- 首次部署后等待几分钟，在「部署 → Pages」查看地址

**Q：新文章不在侧栏？**

- 确认文件在 `vitepress/docs/` 下
- 确认有 `title` frontmatter
- 子目录的父目录需有 `index.md` 作为分类名

**Q：`base` 路径怎么配？**

- 仓库名为 `blog` 时，`config.ts` 中设为 `base: '/blog/'`
- 与访问地址 `https://用户名.gitcode.io/blog/` 保持一致

**Q：本地预览？**

```bash
cd vitepress && npm run docs:dev
```
