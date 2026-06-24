---
title: Docker Compose
order: 4
---

# Docker Compose

多容器编排的入门用法。

## 示例 compose.yml

```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```

## 常用命令

```bash
docker compose up -d
docker compose ps
docker compose logs -f web
docker compose down
```

## 与开发联调

将源码目录挂载为 volume，修改代码后容器内即时生效，适合本地联调。
