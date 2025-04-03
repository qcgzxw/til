## Docker Build 通过参数指定代理

在某些网络环境中，可能需要通过代理来构建 Docker 镜像。这可以通过在 Dockerfile 中设置代理，或者在执行 `docker build` 时通过参数指定代理。

`--build-arg` 是 Docker 构建过程中使用的一个参数，它可以用来向 Dockerfile 中传递变量。在构建过程中，可以使用该参数来设置代理。

```bash
docker build --build-arg HTTP_PROXY=http://your.proxy:port --build-arg HTTPS_PROXY=http://your.proxy:port -t your-image-name .
```

```bash

docker-compose build \
    --build-arg http_proxy="http://172.17.0.1:2333" \
    --build-arg https_proxy="http://172.17.0.1:2333"
```

其中 `172.17.0.1` 是宿主机IP

