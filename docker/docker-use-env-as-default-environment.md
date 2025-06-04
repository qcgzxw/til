# Docker Compose 默认使用 `.env` 文件作为环境变量来源

## 说明

当使用 Docker Compose 管理服务时，Compose 会自动读取当前目录下的 `.env` 文件，将其中的变量作为环境变量注入到：

1. `docker-compose.yml` 文件中的 `${VAR_NAME}` 语法；
2. 容器内部通过 `environment:` 传递的变量；
3. `build:` 中的 `args:` 参数。

---

## 示例

### `.env` 文件内容：

```
MYSQL_ROOT_PASSWORD=secret
MYSQL_DATABASE=mydb
PORT=3306
```

### `docker-compose.yml` 内容：

```yaml
version: '3'
services:
  db:
    image: mysql:8
    ports:
      - "${PORT}:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=${MYSQL_DATABASE}
```

执行以下命令即可自动读取 `.env`：

```bash
docker-compose up -d
```

---

## 注意事项

* `.env` 文件必须与 `docker-compose.yml` 位于**同一目录**；
* `.env` 文件中不支持空格和引号包裹变量名或值；
* `.env` 优先级低于 Shell 中导出的变量（即 `export VAR=xxx`）；
* 不同于 `env_file`（用于将环境变量注入容器），`.env` 是 Compose 的变量替换机制。

---

## 小结

* `.env` 是 Docker Compose 中推荐的环境变量集中管理方式；
* 无需显式声明，Compose 会自动加载；
* 可用于构建镜像、端口映射、配置容器环境等多种场景。

