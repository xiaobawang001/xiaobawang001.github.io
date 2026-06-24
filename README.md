# 个人 Markdown 笔记站（VitePress）

语雀风格个人知识库，基于 VitePress 构建，部署到 GitCode Pages。

## 目录结构

```
blog/
├── vitepress/          # VitePress 站点（Markdown 在 docs/ 下）
├── scripts/            # 部署脚本
├── .gitlab-ci.yml      # GitCode CI 自动构建 Pages
├── GITCODE_DEPLOY.md   # 部署说明
└── README.md
```

## 本地预览

```bash
cd vitepress && npm install
npm run docs:dev
```

默认地址：http://localhost:5173/blog/

## 构建

```bash
cd vitepress && npm run docs:build
```

## 部署到 GitCode Pages

**推荐**：推送代码到 GitCode，`.gitlab-ci.yml` 自动构建并发布。

```bash
git remote add gitcode git@gitcode.com:你的用户名/blog.git
git push -u gitcode master
```

本地仅构建验证：

```bash
./scripts/deploy-gitcode.sh
```

手动推送静态文件（备选）：

```bash
export GITCODE_USER=你的用户名
./scripts/deploy-gitcode.sh --push
```

详细步骤见 [GITCODE_DEPLOY.md](GITCODE_DEPLOY.md)。

## 写作

在 `vitepress/docs/` 下按文件夹组织 Markdown，写好 frontmatter 后侧栏自动生成：

```yaml
---
title: 文章标题
order: 1
---
```

完整说明见 `vitepress/docs/guide/publish.md`。

## 环境依赖

- Node.js 18+
- Git（部署用 SSH 推荐）
