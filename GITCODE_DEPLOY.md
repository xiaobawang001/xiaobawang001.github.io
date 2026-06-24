# GitCode Pages 部署指南

## 推荐方式：单仓库 + CI 自动部署

将本项目推送到 GitCode 后，根目录的 `.gitlab-ci.yml` 会在每次推送 `master` / `main` 时自动：

1. 安装依赖并执行 `npm run docs:build`
2. 将构建产物放入 `public/` 目录
3. 通过 GitCode Pages 发布静态站点

| 配置项 | 说明 |
|--------|------|
| Markdown 源码 | `vitepress/docs/` |
| CI 配置 | `.gitlab-ci.yml` |
| 访问地址 | `https://<用户名>.gitcode.io/<仓库名>/` |

---

## 前置条件

- [ ] 已注册 [GitCode](https://gitcode.com) 账号
- [ ] 本地已安装 Node.js 18+、Git

## 第一步：配置 SSH

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519_gitcode
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_gitcode
cat ~/.ssh/id_ed25519_gitcode.pub
```

将公钥添加到 GitCode：**个人设置 → 公钥管理 → SSH 公钥**

测试连接：

```bash
ssh -T git@gitcode.com
```

## 第二步：创建仓库并推送

1. 在 GitCode 新建**公开**仓库，建议命名为 `blog`
2. 本地关联远程并推送：

```bash
git remote add gitcode git@gitcode.com:你的用户名/blog.git
git push -u gitcode master
# 若默认分支为 main：git push -u gitcode main
```

## 第三步：修改站点配置

编辑 `vitepress/docs/.vitepress/config.ts`：

```ts
const GITCODE_USER = '你的用户名'
const GITCODE_REPO = 'blog'   // 与 GitCode 仓库名一致

base: `/${GITCODE_REPO}/`,
```

`base` 必须与 Pages 访问路径一致。仓库名为 `blog` 时，站点地址为：

`https://你的用户名.gitcode.io/blog/`

## 第四步：查看 CI 与 Pages

1. 推送后进入项目 **构建 → 流水线**，确认 `pages` 任务成功
2. 进入 **部署 → Pages** 查看访问地址
3. 首次部署可能需要等待 1～5 分钟

## 第五步：本地验证（可选）

```bash
cd vitepress && npm run docs:dev
```

## 手动推送静态文件（备选）

若不想使用 CI，可将构建产物推到单独的 Pages 仓库：

```bash
export GITCODE_USER=你的用户名
./scripts/deploy-gitcode.sh --push
```

需在 GitCode 为该仓库开启 Pages，并确保 `config.ts` 中 `base` 与仓库名一致。

---

## 在 GitCode 新建文章

1. 在仓库 `vitepress/docs/` 下新建或编辑 `.md` 文件
2. 写好 frontmatter（`title`、`order`）
3. 提交并 `git push`
4. 等待流水线完成后刷新 Pages 站点

详细写作约定见 `vitepress/docs/guide/publish.md`。

## 使用个人访问令牌（HTTPS）

GitCode 不支持密码推送，HTTPS 需使用个人访问令牌：

```
https://gitcode.com/你的用户名/blog.git
```

在 **个人设置 → 私人令牌** 中创建，推送时以令牌作为密码。

## 常见问题

**流水线未运行？**

- 确认根目录存在 `.gitlab-ci.yml`
- 确认推送到了 `master` 或 `main` 分支

**页面样式错乱 / 404？**

- 检查 `config.ts` 的 `base` 是否为 `/<仓库名>/`（首尾斜杠格式：`/blog/`）
- 本地用 `npm run docs:build && npm run docs:preview` 验证

**Pages 入口找不到？**

- GitCode 基于 GitLab，一般在项目左侧 **部署 → Pages**
- 部分账号的 Pages 功能仍在完善中，可改用 `./scripts/deploy-gitcode.sh --push` 推静态文件
