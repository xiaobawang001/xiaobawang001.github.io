---
title: 博客工具链
order: 3
---

# 博客工具链

本站使用 **VitePress** 构建，Markdown 源文件位于 `vitepress/docs/`。

## 常用命令

```bash
cd vitepress
npm run docs:dev      # 本地预览
npm run docs:build    # 构建静态站点
```

## 部署

推送代码到 GitCode，由 `.gitlab-ci.yml` 自动部署：

```bash
git push gitcode master
```

本地构建验证：

```bash
./scripts/deploy-gitcode.sh
```

## 踩坑记录

- `config.ts` 中 `base` 须与 GitCode Pages 路径一致（默认 `/blog/`）
- 流水线成功后访问地址在 GitCode 项目「部署 → Pages」中查看
