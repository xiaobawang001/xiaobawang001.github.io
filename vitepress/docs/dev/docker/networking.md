---
title: Docker 网络
order: 3
---

# Docker 网络

容器网络模式与常用排查命令。

## 网络模式

| 模式 | 说明 |
|------|------|
| bridge | 默认，容器间可通过网络名通信 |
| host | 与宿主机共享网络栈 |
| none | 无网络 |

## 常用命令

```bash
docker network ls
docker network inspect bridge
docker run --network mynet nginx
```

## 容器互访

同一自定义网络下的容器可通过**容器名**作为主机名互相访问。
