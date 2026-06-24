---
title: Git 常用命令
order: 2
---

# Git 常用命令

日常开发中最常用的 Git 操作备忘。

## 基础操作

```bash
git status
git add .
git commit -m "feat: 新功能"
git push origin master
```

## 分支管理

```bash
git checkout -b feature/new-page
git merge feature/new-page
git branch -d feature/new-page
```

## 撤销与回退

| 场景 | 命令 |
|------|------|
| 撤销工作区修改 | `git checkout -- <file>` |
| 撤销暂存 | `git reset HEAD <file>` |
| 回退提交 | `git reset --soft HEAD~1` |

## 远程仓库

```bash
git remote -v
git remote add origin git@gitcode.com:user/repo.git
git pull --rebase origin master
```
