---
title: 网络测试记录
order: 3
---

# 网络测试记录

容器间网络隔离与互通的测试备忘。

## 测试步骤

```bash
docker network create testnet
docker run -d --name a --network testnet alpine sleep 3600
docker run -d --name b --network testnet alpine sleep 3600
docker exec a ping -c 2 b
```

## 观察点

- DNS 解析是否使用容器名
- 跨网络是否无法 ping 通
- 端口映射与容器内端口区别

## 踩坑

WSL2 下偶发端口占用，需 `ss -tlnp` 排查宿主机进程。
