## MP2 配置企业微信
<https://wiki.movie-pilot.org/zh/notification#%E5%BE%AE%E4%BF%A1>

### 参数获取
1. 企业ID：在企业微信管理后台我的企业－企业信息下查看企业ID。
2. 应用Secret： 在企业微信管理后台应用管理－自建下查看Secret。
3. 应用AgentId：在企业微信管理后台应用管理－自建下查看AgentId。
4. 消息推送代理：填写自己可用的消息代理服务地址，并将消息代理服务器的真实IP填写到企业微信应用IP白名单中。


### 问题排查
出现问题第一时间查日志，不要算命。

#### 第一次错误提示

```bash
ERROR:   wechat.py - 获取微信access_token失败，未获取到返回信息

ERROR:   wechat.py - 获取微信access_token失败，错误信息：获取微信access_token失败，网络连接失败

ERROR:   wechat.py - 获取微信access_token失败，请检查参数配置
```
配置错误 或者 反代网址错误。这里我使用了阿里云未备案域名导致，重新配置之后恢复


#### not allow to access from your ip
文档有写，手动在web端允许IP即可

