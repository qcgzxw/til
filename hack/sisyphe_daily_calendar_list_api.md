## sisphe daily calendar
环境:
- X-API-PLATFORM: iOS
- appVersion: 2.15.0
- deviceOs: iPadOS18.6.2

---

通过iOS抓包发现惜福日历请求，API 居然不需要任何认证。任何匿名用户都可以获取，甚至都不需要伪造cookie。

直接修改post body 批量获取可以抓取整年数据。

---

安卓抓包没找到接口

