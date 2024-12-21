## iptalbes参数与基本使用方法

### 常用参数
- `-A`：在指定链的末尾添加规则。
- `-I`：在指定链的指定位置插入规则。
- `-D`：删除指定链的规则。
- `-P`：设置链的默认策略。
- `-L`：列出链中的规则。
- `-F`：清空指定链的规则。
- `-t`：指定表（`filter`, `nat`, `mangle`, `raw`）。
- `-s`：源地址。
- `-d`：目标地址。
- `-p`：指定协议（如 `tcp`, `udp`）。
- `--dport`：目标端口。
- `--sport`：源端口。
- `-j`：指定动作（如 `ACCEPT`, `DROP`, `REJECT`）。

### 基本用法
#### 允许特定端口流量
```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```
#### 拒绝特定IP的访问
```bash
iptables -A INPUT -s 192.168.1.100 -j DROP
```
#### 转发流量
```bash
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
```
#### 查看规则
```bash
iptables -L -n -v
```
