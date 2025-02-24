# 使用 CDN（Cloudflare）获取真实 IP 和 Nginx 配置

## 背景

当使用 Cloudflare 作为 CDN 时，用户的真实 IP 地址会被 Cloudflare 的服务器隐藏，访问到你的服务器的 IP 地址会是 Cloudflare 的 IP 地址。为了获取用户的真实 IP 地址，需要在 Nginx 中进行额外的配置。

## 获取 Cloudflare 真实 IP 地址

Cloudflare 会将客户端的真实 IP 地址放在 HTTP 请求的 `X-Forwarded-For` 头中，或者 `CF-Connecting-IP` 头中。

### 真实 IP 的提取方法

在 Cloudflare 的设置中，客户端的 IP 会通过以下 HTTP 头传递：
- `X-Forwarded-For`
- `CF-Connecting-IP`

## Nginx 配置

要正确获取并显示真实 IP 地址，需要在 Nginx 中使用 `set_real_ip_from` 指令。配置步骤如下：

1. **修改 Nginx 配置文件**

编辑 Nginx 配置文件 `/etc/nginx/nginx.conf`，在 `http` 或 `server` 块中添加如下配置：

```nginx
   # Cloudflare 代理 IP 范围（确保设置可信代理）
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 131.0.72.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 2400:cb00::/32;
    set_real_ip_from 2606:4700::/32;
    set_real_ip_from 2803:f800::/32;
    set_real_ip_from 2405:b500::/32;
    set_real_ip_from 2405:8100::/32;
    set_real_ip_from 2a06:98c0::/29;
    set_real_ip_from 2c0f:f248::/32;

    # 使用 CF-Connecting-IP 获取真实 IP
    real_ip_header CF-Connecting-IP;
    real_ip_recursive on;
```
IP来源：[IP范围|Cloudflare](https://www.cloudflare.com/zh-cn/ips/)

2. 重载nginx配置
```bash
sudo nginx -s reload
```

