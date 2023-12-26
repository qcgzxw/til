## 获取本周一时间戳
```shell
# php > echo(date('y-m-d', strtotime('monday', strtotime(date('2023-12-04'))))); // 周一
23-12-04 # 本周一
# php > echo(date('y-m-d', strtotime('monday', strtotime(date('2023-12-05'))))); // 周二
23-12-11 # 下周一
```

> 在PHP中，strtotime 函数用于将任何英语文本的日期时间描述转换为 Unix 时间戳。对于字符串 'monday'，strtotime 会返回当前周的下一个星期一的时间戳。

> 请注意，如果当前日期已经是星期一，那么它会返回当前日期的时间戳，而不是下一个星期一。

```shell
# php > echo(date('Y-m-d', strtotime('last monday', strtotime('tomorrow'))));
```
使用明天的monday来获取本周一的时间戳
