# 个人 Markdown 笔记站（VitePress）

语雀风格个人知识库，基于 VitePress 构建，部署到 GitHub Pages。

**在线地址**：https://xiaobawang001.github.io/blog/

## 目录结构

```
blog/
├── vitepress/              # VitePress 站点（Markdown 在 docs/ 下）
├── .github/workflows/      # GitHub Actions 自动部署
├── GITHUB_DEPLOY.md        # 部署说明
└── README.md
```

## 本地预览

```bash
cd vitepress && npm install
npm run docs:dev
```

## 部署

推送 `master` 分支后 GitHub Actions 自动构建发布。详见 [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)。

```bash
git push github master
```

## 写作

在 `vitepress/docs/` 下按文件夹组织 Markdown，写好 frontmatter 后侧栏自动生成。详见 `vitepress/docs/guide/publish.md`。
