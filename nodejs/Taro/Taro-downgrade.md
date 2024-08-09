## Taro V4.0.4降级至Taro V3.6.34
由于目前Taro v4.0 bug太多且非稳定版，决定降级Taro至稳定发行版v3.6
1. 卸载Taro-cli，重新安装Taro-cli v3.6.34
2. 手动指定所有依赖版本为 `v3.6.34`
3. 修改 `browserslist`
4. 清除缓存，安装/更新依赖

```bash
npm uninstall -g @tarojs/cli
npm install -g @tarojs/cli@3.6.34
# 手动指定taro依赖
# 修改browserslist
#    "last 3 versions",
#    "Android >= 4.1",
#    "ios >= 8"
vim package.json
# 删除缓存
rm -rf node_modules package-lock.json
npm cache clean --force

npm install
```

