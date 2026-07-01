---
title: psql安装
order: 0
---

# psql安装

## 1. 拉取镜像

```bash

    # 拉取 PostgreSQL 18 官方镜像
    docker pull postgres:latest

    # 如果拉取失败，使用国内镜像源
    docker pull docker.m.daocloud.io/library/postgres:latest
    docker tag docker.m.daocloud.io/library/postgres:latest postgres:latest

```

## 2. 启动容器

```bash

    # 1. 创建数据卷
    # 删除旧的数据卷 docker volume rm pgdata
    docker volume create pgdata

    # 2. 启动容器
    docker run -d \
        --name postgres \
        -e POSTGRES_USER=username \
        -e POSTGRES_PASSWORD=mypassword \
        -e POSTGRES_DB=mydb \
        -v pgdata:/var/lib/postgresql \
        -p 5432:5432 \
        --restart unless-stopped \
        postgres:18

    # 3. 启动示例
    docker run -d \
        --name postgres \
        -e POSTGRES_USER=root \
        -e POSTGRES_PASSWORD=root \
        -e POSTGRES_DB=testdb \
        -v pgdata:/var/lib/postgresql \
        -p 5432:5432 \
        --restart unless-stopped \
        postgres:18    
```

