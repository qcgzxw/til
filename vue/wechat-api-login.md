# 微信登录流程注意事项：`redirect_uri` 参数会忽略 `#` 及其后内容

## 背景

在使用微信开放平台的 **移动应用微信登录**（例如 OAuth2 登录流程）时，开发者需要在请求登录授权时传递 `redirect_uri` 参数，以便用户授权完成后微信将结果回调到指定地址。

然而，在实践中需要特别注意一点：

> 微信登录接口在处理 `redirect_uri` 时，会**忽略 URL 中的 `#` 及其后部分**。

---

## 官方说明出处

> 参考官方文档：
> [微信开放平台 - 移动应用微信登录开发指南](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)

---

## 举例说明
```text

假设你设置的回调地址如下：

redirect_uri=https://example.com/login#wechat

实际微信服务器会将其解析为：

https://example.com/login


因此，`#wechat` 以及其后的内容将被**忽略**，不会参与回调过程，也不会出现在浏览器地址栏中。

```
---

## 为什么会被忽略？

- URL 中 `#` 后的部分为 **Fragment（片段标识符）**，属于客户端解析内容；
- 浏览器或 WebView 在发起请求时，不会将 `#` 后的内容发送给服务器；
- 微信服务器在回调时也不会保留该部分。

---

## 正确做法

### ✅ 建议使用查询参数（`?key=value`）传递信息，而不是 fragment：

```text
正确示例：
redirect_uri=https://example.com/login?from=wechat

# 避免使用：
错误示例：
redirect_uri=https://example.com/login#wechat

```
