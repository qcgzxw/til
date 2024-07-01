## PM2
可以很方便的使用pm2管理Node.js项目
可实现功能
- 日志
- 二进制文件运行
- 指定node版本
- 监控

### pm2命令说明
```shell
# 执行Node.js项目
pm2 start index.js \
    --interpreter ~/.nvm/versions/node/v12.16.1/bin/node \
    --name demo \
    --cwd /home/owen/nodejs
# --interpreter 指定Node.js版本
# --name 指定项目名称
# --cmd 指定运行目录

# 执行二进制文件
pm2 start "ls -la"

# Use `pm2 logs mitmweb [--lines 1000]` to display logs
# Use `pm2 env 6` to display environment variables
# Use `pm2 monit` to monitor CPU and Memory usage mitmweb
```
### pm2 开机运行
```shell
# 配置pm2开机自启
pm2 startup
# 保存项目状态
pm2 save 
```
