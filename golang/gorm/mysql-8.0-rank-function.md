## gorm where函数使用字符串模式时，不会自动加反引号
### 问题说明
gorm where、order等函数使用字符串模式时，不会自动加反引号，导致rank等字段被MySQL识别为函数报错。

[gorm doc](https://gorm.io/zh_CN/docs/query.html#String-%E6%9D%A1%E4%BB%B6)

### 使用版本：
- gorm v1.24.6
- mysql Ver 8.0.34

### 临时解决方法
- 在涉及到关键函数时，手动加上反引号
```go
db.Where("`rank` = ?", 1).Order("`rank` asc").First(&rank)
```
