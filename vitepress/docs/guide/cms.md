---
title: 在线写作
order: 2
tags: [指南]
---

# 在线写作（Decap CMS）

本站集成了 [Decap CMS](https://decapcms.org/)，可在浏览器中写 Markdown、上传图片，保存后自动提交到 GitHub，触发 Actions 构建发布。

**写作入口**：[https://xiaobawang001.github.io/blog/admin/](https://xiaobawang001.github.io/blog/admin/)

---

## 一、本地试用（无需 OAuth）

适合在电脑上先熟悉编辑器。

**终端 1** — 启动本地 CMS 后端：

```bash
cd vitepress
npm run cms:server
```

**终端 2** — 启动站点预览：

```bash
cd vitepress
npm run docs:dev
```

浏览器打开：`http://localhost:5173/blog/admin/`

本地模式下修改会写入仓库里的 Markdown 文件（与 `vitepress/docs/` 同步），**不会**走 GitHub 登录。

---

## 二、线上使用（GitHub 登录）

GitHub Pages 是静态托管，CMS 登录需要一个小型 **OAuth 代理**（仓库已提供 Cloudflare Worker 脚本）。

### 0. 注册 Cloudflare workers.dev 子域（一次性）

首次使用 Cloudflare Workers 前，需要为账号注册 `workers.dev` 子域：

1. 打开 [Cloudflare Workers 入门](https://dash.cloudflare.com/?to=/:account/workers/onboarding)
2. 按提示选择一个子域前缀（例如 `xiaobawang001`）
3. 完成后重新运行 GitHub Actions：**Deploy CMS OAuth Worker**

> GitHub Actions 也会尝试自动注册；若失败，请手动完成上述步骤。可选：在仓库 **Variables** 中设置 `CLOUDFLARE_WORKERS_SUBDOMAIN` 指定想要的前缀。

### 1. 创建 GitHub OAuth App

打开 [GitHub → Settings → Developer settings → OAuth Apps → New](https://github.com/settings/applications/new)：

| 字段 | 填写 |
|------|------|
| Application name | `blog-cms`（任意） |
| Homepage URL | `https://xiaobawang001.github.io/blog/` |
| Authorization callback URL | `https://<你的Worker域名>/callback` |

记下 **Client ID** 和 **Client Secret**。

### 2. 部署 OAuth Worker（Cloudflare）

```bash
cd cms/oauth-worker
npm i -g wrangler   # 若未安装
wrangler login
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler deploy
```

部署成功后得到地址，例如：`https://blog-cms-oauth.xxx.workers.dev`

### 3. 修改 CMS 配置

编辑 `vitepress/docs/public/admin/config.yml`，在 `backend` 下取消注释并填入 Worker 地址：

```yaml
backend:
  name: github
  repo: xiaobawang001/blog
  branch: master
  base_url: https://blog-cms-oauth.xxx.workers.dev
  auth_endpoint: auth
```

提交并推送到 `master` 后，打开 [在线写作后台](https://xiaobawang001.github.io/blog/admin/)，点击 **Login with GitHub** 即可。

---

## 三、后台能写什么

| 集合 | 说明 |
|------|------|
| **服务器笔记** | `vitepress/docs/server/` 下各层目录，支持新建子目录文章 |
| **指南** | `vitepress/docs/guide/` 下的指南文章 |
| **目录名称** | 各文件夹的 `index.md`（仅改侧栏文件夹标题） |

新建文章时填写 **标题、排序、标签、正文** 即可，与 [发布指南](/guide/publish) 中的 frontmatter 约定一致。

图片上传到 **uploads**，会保存到 `vitepress/docs/public/uploads/`，文中引用路径为 `/blog/uploads/文件名`。

---

## 四、发布流程

1. 在 CMS 中编辑并点击 **Publish**
2. CMS 将变更 commit 到 `master`
3. GitHub Actions 自动构建并部署（约 1～2 分钟）
4. 访问站点查看更新

---

## 五、常见问题

**Q：登录按钮无反应？**

- 确认已配置 `base_url` 并重新部署站点
- OAuth App 的 callback URL 必须与 Worker 的 `/callback` 完全一致

**Q：提示没有仓库权限？**

- 登录的 GitHub 账号需要对 `xiaobawang001/blog` 有 **push** 权限

**Q：不想用 Cloudflare？**

- 可将 `cms/oauth-worker/worker.js` 部署到任意支持环境变量的平台（Vercel、Railway 等），保证提供 `/auth` 与 `/callback` 两个路由即可

**Q：本地与线上有什么区别？**

- 本地：`local_backend` + `cms:server`，直接改文件
- 线上：GitHub 后端，通过 OAuth 提交 commit
