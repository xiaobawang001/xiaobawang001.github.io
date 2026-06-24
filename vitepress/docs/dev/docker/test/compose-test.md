---
title: Compose 测试记录
order: 2
---

# Compose 测试记录

docker/test 子目录下的 Compose 联调笔记。

## 测试环境

```bash
cd dev/docker/test
docker compose up -d
curl http://localhost:3000/health
```

## 用例

1. 服务启动顺序依赖
2. 环境变量注入
3. 网络连通性

## 结论

健康检查配置 `healthcheck` 可避免下游服务过早连接失败。
