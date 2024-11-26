## Docker 的 iptables 规则

Docker 在运行时会自动设置 `iptables` 规则，以便容器的网络通信能够正常工作。主要涉及两个链：

1. **DOCKER** 链：由 Docker 自动管理，用于容器之间的 NAT 和路由。
2. **DOCKER-USER** 链：由用户管理，用于自定义规则，优先级高于 Docker 默认规则。

---

### DOCKER 链

- `DOCKER` 链是 Docker 自动生成并管理的，包含与容器相关的 NAT 和路由规则。
- **不建议手动修改**该链，因为 Docker 会在容器状态变化时重置这些规则。

### DOCKER-USER 链

- DOCKER-USER 链用于自定义防火墙规则，所有进入 Docker 的流量会先经过此链。
- 适合用户管理规则，例如限制未授权的访问或实现流量控制。

### 规则优先级：
流量进入 Docker 时会先经过 DOCKER-USER 链，再进入 Docker 的其他链（如 DOCKER）。

> 自定义规则应写在 DOCKER-USER 链，避免影响 Docker 自动生成的规则。
