---

title: pgvector扩展安装
order: 1
---

# 安装pgvector扩展

## 1. 已有postgresql容器



### 1.1 进入容器并安装必要工具

```bash
    docker exec -it postgres bash
    apt-get update
    apt-get install -y wget lsb-release gnupg
```

### 1.2 安装 pgvector 预编译包

```bash
   
    # 1. 下载并导入官方 GPG 密钥 
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor > /usr/share/keyrings/pgdg.gpg
   
    # 2. 添加 APT 源
    echo "deb [signed-by=/usr/share/keyrings/pgdg.gpg] http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
   
    # 3. 更新源列表
    apt-get update

    # 4. 安装 pgvector 预编译包
    apt-get install -y postgresql-18-pgvector
```



## 2. 安装带pgvector的postgresql镜像（推荐）



### 2.1 拉取镜像

```bash

    # 拉取社区镜像
    docker pull pgvector/pgvector:pg18

     # 如果拉取失败，使用国内镜像源
    docker pull docker.m.daocloud.io/pgvector/pgvector:pg18
    docker tag docker.m.daocloud.io/pgvector/pgvector:pg18 pgvector:pg18
    docker rmi  docker.m.daocloud.io/pgvector/pgvector:pg18
```



### 2.2 启动容器

```bash
    # 1. 创建数据卷
    # 删除旧的数据卷 docker volume rm pgdata
    docker volume create pgdata

    # 2. 启动容器
    docker run -d \
        --name postgres18-pgvector \
        -e POSTGRES_USER=username \
        -e POSTGRES_PASSWORD=mypassword \
        -e POSTGRES_DB=pgtest \
        -v pgdata:/var/lib/postgresql \
        -p 5432:5432 \
        --restart unless-stopped \
        pgvector:pg18
```



## 3. 进入容器启用插件

```bash
    # 1. 连接数据库
    docker exec -it postgres18-pgvector psql -U username -d pgtest

    # 2. 启用插件
    CREATE EXTENSION IF NOT EXISTS vector;

    # 3. 插件可用性
    SELECT typname FROM pg_type WHERE typname = 'vector';
    #or
    SELECT '[1,2,3]'::vector;

    # 4. 卸载插件
    DROP EXTENSION IF EXISTS vector;
```

