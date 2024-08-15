## apt配置代理

修改 `/etc/apt/apt.conf` 文件，添加以下内容：

```
Acquire::http::Proxy "http://<your-proxy-server>:<port>/";
Acquire::https::Proxy "http://<your-proxy-server>:<port>/";
```

保存后，执行 `sudo apt update` 验证配置是否成功。

