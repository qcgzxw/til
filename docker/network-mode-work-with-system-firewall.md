## Docker 开放端口会绕过iptables规则
使用host模式时，如需要暴露端口可以使用 **-p 8080:8080**，值得注意的是，以上命令不仅会开放docker容器的端口，还会将主机的8080端口暴露于公网（即使默认的系统防火墙没有开放8080端口）。
使用以上命令会在host创建防火墙规则，这就是导致主机端口暴露的原因。

**-p 8080:8080** 等于 **-p 0.0.0.0:80808:80808**

根据docker文档，我们可以指定docker container的ip或者**127.0.0.1**来避免暴露host端口

> Publishing container ports is insecure by default. Meaning, when you publish a container's ports it becomes available not only to the Docker host, but to the outside world as well.
If you include the localhost IP address (127.0.0.1) with the publish flag, only the Docker host can access the published container port.

[Published ports](https://docs.docker.com/network/#published-ports)
