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

### 第 2 步：重新运行部署

1. 打开 https://github.com/xiaobawang001/blog/actions/workflows/deploy.yml
2. 点击 **Run workflow** → 选 `master` → **Run workflow**
3. 等约 1～2 分钟，**build** 和 **deploy** 都变绿 ✓

### 第 3 步：确认站点

回到 **Settings → Pages**，顶部应出现：

```text
Your site is live at https://xiaobawang001.github.io/blog/
```

---

## 若 deploy 仍失败

常见错误：`Ensure GitHub Pages has been enabled`

说明第 1 步 Source 还没改成 **GitHub Actions**，请回去检查。

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
