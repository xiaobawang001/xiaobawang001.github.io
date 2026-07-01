# GitHub Pages 部署指南

## 访问地址（启用后）

https://xiaobawang001.github.io/blog/

---

## 首次启用（必做，只需一次）

你目前在 **Settings → Pages** 看到的 **Jekyll**、**Static HTML** 是 GitHub 的推荐模板，**不要点击它们**。

按下面做：

### 第 1 步：把 Source 设为 GitHub Actions

1. 打开 https://github.com/xiaobawang001/blog/settings/pages
2. 在 **Build and deployment** 区域找到 **Source** 下拉框
3. 选择 **GitHub Actions**（不要选 Deploy from a branch）
4. **不要** 点下面的 Jekyll 或 Static HTML 卡片

> 选完 Source 后，下面可能仍显示推荐 workflow，可以忽略。我们仓库里已有自己的 `.github/workflows/deploy.yml`。

### 第 2 步：允许 `master` 分支部署

首次从 `main` 切到 `master` 时，deploy 可能报错：

```text
Branch "master" is not allowed to deploy to github-pages due to environment protection rules.
```

按下面改一次即可：

1. 打开 https://github.com/xiaobawang001/blog/settings/environments
2. 点击 **github-pages**
3. 找到 **Deployment branches**（部署分支）
4. 选 **All branches**，或在 **Selected branches** 里添加 **master**
5. 保存

### 第 3 步：重新运行部署

1. 打开 https://github.com/xiaobawang001/blog/actions/workflows/deploy.yml
2. 点击 **Run workflow** → 选 `master` → **Run workflow**
3. 等约 1～2 分钟，**build** 和 **deploy** 都变绿 ✓

### 第 4 步：确认站点

回到 **Settings → Pages**，顶部应出现：

```text
Your site is live at https://xiaobawang001.github.io/blog/
```

---

## 若 deploy 仍失败

| 错误信息 | 处理 |
|----------|------|
| `Branch "master" is not allowed to deploy...` | 见上文第 2 步，在 **github-pages** 环境里放行 `master` |
| `Ensure GitHub Pages has been enabled` | 第 1 步 Source 还没改成 **GitHub Actions** |

查看失败日志：https://github.com/xiaobawang001/blog/actions

---

## 日常更新

```bash
git add .
git commit -m "docs: 更新笔记"
git push github master
```

推送后 Actions 会自动重新部署。

## 本地预览

```bash
cd vitepress && npm run docs:dev
# http://localhost:5173/blog/
```

## SSH

```bash
ssh -T git@github.com
```
