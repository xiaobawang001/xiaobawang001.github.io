---
title: npm 备忘
order: 5
---

# npm 备忘

Node 包管理常用命令速查。

## 安装依赖

```bash
npm install
npm install lodash
npm install -D typescript
npm ci
```

## 脚本运行

```bash
npm run dev
npm run build
npx vitepress dev docs
```

## 版本与清理

```bash
npm list --depth=0
npm outdated
npm cache clean --force
rm -rf node_modules package-lock.json && npm install
```

## 国内镜像

```bash
npm config set registry https://registry.npmmirror.com
```
