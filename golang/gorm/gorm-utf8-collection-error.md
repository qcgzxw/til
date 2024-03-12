## Incorrect string value
在插入新的4字节utf-8字符时，gorm报错
```go
Incorrect string value: '\xF0\x93\x80\x80' for column 'names' at row 1
```
检测mysql数据库格式，为utf8-mb4，正常。
手动执行sql语句插入，正常。
排查是gorm与mysql连接问题，发现gorm指定mysql DSN指定了编码为`utf8`，改为`utf8-mb4`之后正常
