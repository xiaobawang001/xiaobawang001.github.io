---
title: Docker 数据卷
order: 5
---

# Docker 数据卷

持久化容器数据的几种方式。

## 绑定挂载

```bash
docker run -v /host/path:/container/path nginx
```

## 命名卷

```bash
docker volume create mydata
docker run -v mydata:/data postgres
```

## 对比

- **bind mount**：直接映射宿主机路径，适合开发
- **volume**：由 Docker 管理，适合生产数据持久化

## 清理

```bash
docker volume ls
docker volume prune
```
