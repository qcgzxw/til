# Android 15 使用 mitm 抓包时证书信任问题及解决方案（已 root 设备）

## 背景

在 Android 7 以后，系统默认不再信任用户添加的 CA 根证书用于 **应用的网络连接验证**。尤其在 Android 14/15 上，这一限制更严格，导致使用 mitmproxy、Charles、Fiddler 等中间人代理工具抓取 HTTPS 流量时，即使已将证书安装到系统中，仍然会出现：

- HTTPS 请求无法解密
- 报错 `certificate unknown` / `SSL handshake failed`
- 应用忽略用户 CA，只信任系统内置 CA

---

## 解决方案：在已 root 的设备上使用 moveCertificate 模块

### 模块简介

**moveCertificate** 是一个专门为 Magisk 或 KernelSU 开发的模块，用于将用户安装的 CA 证书（一般位于 `/data/misc/user/0/cacerts-added/`）**移动并链接到系统证书目录**，从而实现全局信任。

项目地址：https://github.com/ys1231/MoveCertificate/releases

---

## 操作步骤（Magisk / KernelSU 均适用）

### 1. 安装 MoveCertificate 模块

- 下载 zip 安装包：[GitHub Releases](https://github.com/ys1231/MoveCertificate/releases)
- 通过 Magisk 或 KernelSU Manager 安装该模块
- 安装完成后 **重启设备**

### 2. 安装 mitmproxy / Charles 的证书

- 使用浏览器访问代理地址（如 `http://mitm.it`）
- 下载并安装 `.crt` 文件（通常命名为 `mitmproxy-ca-cert.pem`）
- 系统会将证书安装到用户目录 `/data/misc/user/0/cacerts-added/`

### 3. 模块自动检测并链接证书

重启后，MoveCertificate 模块会自动将用户添加的 CA 证书**软链接**到系统受信任的目录：


