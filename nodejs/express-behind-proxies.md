# Node.js Express 默认屏蔽反向代理设置

在使用 Node.js 的 Express 框架时，如果应用部署在反向代理（如 Nginx、Cloudflare 等）后，默认情况下 Express 会屏蔽通过代理访问时的客户端真实 IP 地址。要让 Express 正确处理通过代理传递的真实 IP，需要手动设置 `app.set('trust proxy', true)`。

## 为什么需要设置 `trust proxy`

当 Express 应用部署在反向代理后，客户端的真实 IP 地址会被代理服务器替换为代理服务器的 IP 地址。例如，Nginx 或 Cloudflare 会将客户端的真实 IP 放在 `X-Forwarded-For` HTTP 头中，而 Express 默认并不会信任这些头信息。因此，默认情况下，Express 会将代理服务器的 IP 地址作为客户端 IP 地址。

通过设置 `app.set('trust proxy', true)`，Express 会信任代理服务器传递的 `X-Forwarded-For` 头，并正确识别客户端的真实 IP。

## 设置步骤

1. **在 Express 应用中设置 `trust proxy`**：

   在你的 Express 应用的入口文件（通常是 `app.js` 或 `server.js`）中，加入以下设置：

```javascript
   const express = require('express');
   const app = express();

   // 信任反向代理，允许使用 X-Forwarded-For 头部获取真实 IP
   app.set('trust proxy', true);

   // 示例路由，输出客户端 IP
   app.get('/', (req, res) => {
     res.send(`Client IP: ${req.ip}`);
   });

   // 启动服务器
   app.listen(3000, () => {
     console.log('Server is running on port 3000');
   });
```

## 总结

1. 默认情况下，Express 不信任反向代理传递的客户端 IP 信息。
2. 使用 app.set('trust proxy', true) 可以让 Express 信任反向代理的 X-Forwarded-For 头部，从而获取客户端的真实 IP。
3. 配置时应考虑代理链及安全性，确保反向代理服务器是可信的。
