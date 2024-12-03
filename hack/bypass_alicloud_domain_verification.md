# 绕过大陆地区阿里云服务器备案域名验证

在大陆地区使用阿里云服务器时，如果域名未备案，阿里云会通过检测 TLS 握手中的 SNI 信息，主动向客户端和服务端各发送 5 个 RST（重置连接）包，从而阻止访问。

以下是绕过阿里云备案域名屏蔽的技术方案和实现原理。

---

## 原理解析

1. **检测机制**：
   - 阿里云会在 TLS 握手阶段解析 SNI（Server Name Indication）字段以获取目标域名。
   - 如果检测到该域名未备案，则向双方发送 RST 包终止连接。

2. **绕过思路**：
   - **屏蔽 RST 包**：在客户端和服务器两端屏蔽由阿里云服务器发来的 RST 包。
   - **保留连接**：通过丢弃 RST 包，维持正常的 TCP 连接，完成 TLS 握手和后续通信。

---

## 实现步骤

### 1. 服务端 屏蔽 RST 包

使用 `iptables` 在服务器端屏蔽来自阿里云防火墙伪造的客户 RST 包：

```bash
# 屏蔽443端口的所有 RST 包
iptables -I INPUT -p tcp --dport 443 --tcp-flags RST RST -j DROP
# 由于docker独立于INPUT和OUTPUT链，需要额外添加docker的规则
iptables -I DOCKER-USER -p tcp --dport 443 --tcp-flags RST RST -j DROP
```
### 2. 客户端 屏蔽 RST 包
使用 `iptables` 在服务器端屏蔽来自阿里云防火墙伪造的来自服务器的 RST 包：

以下 **1.1.1.1** 为 服务器IP，避免误杀

```bash
# 屏蔽来自SERVER-IP 443端口的 RST 包
iptables -I INPUT -s 1.1.1.1 -p tcp --dport 443 --tcp-flags RST RST -j DROP

# 由于docker独立于INPUT和OUTPUT链，需要额外添加docker的规则
iptables -I DOCKER-USER -s 1.1.1.1 -p tcp --dport 443 --tcp-flags RST RST -j DROP
```

PS: 可以直接在OpenWrt添加自定义规则，局域网内所有设备都可以连接
```bash
# 屏蔽INPUT，OpenWrt本地生效
iptables -I INPUT -s 1.1.1.1 -p tcp --dport 443 --tcp-flags RST RST -j DROP
# 屏蔽FORWARD，局域网内所有设备生效
iptables -I FORWARD -p tcp -s 1.1.1.1 --dport 443 --tcp-flags RST RST -j DROP
```

## 效果图:

删除防火墙规则
![67ed40a03384602ab4d78bddbffe1139.png](https://image.qcgzxw.cn/data-image/2024/11/26/67ed40a03384602ab4d78bddbffe1139.png)

添加防火墙规则
![99d8fc1bd567fb4255d02cb5a4e32a51.png](https://image.qcgzxw.cn/data-image/2024/11/26/99d8fc1bd567fb4255d02cb5a4e32a51.png)

