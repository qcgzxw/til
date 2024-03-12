## 部署wechaty时遇到的问题

### shell默认走了代理导致报错
关闭代理

### 启动失败报错

> /Users/charleswu/Workspace/getting-started/node_modules/@grpc/grpc-js/src/subchannel-address.ts:40 return 'port' in address; ^ TypeError: Cannot use 'in' operator to search for 'port' in undefined at isTcpSubchannelAddress

- 2024/03/24 临时解决方案：
https://github.com/wechaty/puppet-supports/issues/364#issuecomment-1952270004

### 重启机器人报错
- 2024/03/24 临时解决方案：禁用缓存

```shell
WECHATY_PUPPET_SERVICE_DISABLE_EVENT_CACHE=true
```
