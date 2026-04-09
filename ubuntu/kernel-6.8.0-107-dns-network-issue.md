## Ubuntu 内核 6.8.0-100~6.8.0-103 DNS 网络中断问题

Ubuntu 内核版本 `6.8.0-100-generic` 至 `6.8.0-103-generic` 存在 DNS 网络中断的 bug。

### 问题表现

在这几个内核版本中，DNS 查询会随机出现 `network is unreachable` 错误。可以使用以下命令测试：

```bash
for i in {1..20}; do doggo doh.360.cn @https://1.1.1.1/dns-query --time; done
```

测试过程中会随机出现网络不可达的错误。

### 解决方案

升级到内核 `6.8.0-107-generic` 或更新版本，重启系统后问题解决：

```bash
sudo apt update
sudo apt upgrade
sudo reboot
```

### 参考

- [Reddit讨论 - Ubuntu内核网络问题](https://www.reddit.com/r/Ubuntu/comments/1qzd9fz/anybody_noticed_any_network_problems_with_kernel)