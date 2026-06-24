---
title: WSL 使用笔记
order: 4
---

# WSL 使用笔记

在 Windows 下通过 WSL2 进行 Linux 开发的记录。

## 安装与更新

```bash
wsl --install
wsl --update
wsl -l -v
```

## 文件系统

- Windows 访问 Linux：`\\wsl$\Ubuntu\home\bobo\`
- Linux 访问 Windows：`/mnt/c/Users/...`

## 网络与端口

WSL2 下 `localhost` 通常可直接访问 Windows 端口，开发服务器默认可用。

## 性能建议

将项目放在 Linux 文件系统（`~/projects/`）而非 `/mnt/c/`，I/O 性能更好。
