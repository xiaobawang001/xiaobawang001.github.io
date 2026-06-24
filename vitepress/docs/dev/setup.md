---
title: 基础工具
order: 1
---

# 基础工具与环境

记录我在 WSL2 + Ubuntu 环境下的常用开发工具配置。

## 基础工具

```bash
node -v
python3 --version
git --version
```

| 工具 | 用途 |
|------|------|
| Node.js | VitePress 构建与本地预览 |
| Git | 版本管理与 GitCode 部署 |

## WSL2 常用命令

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential
```

## 编辑器

日常使用 Cursor / VS Code，配合 WSL 远程开发：

- 终端直接在 WSL 内运行
- 项目路径：`~/projects/`
- Git 凭证通过 SSH 或 GitCode 私人令牌配置
