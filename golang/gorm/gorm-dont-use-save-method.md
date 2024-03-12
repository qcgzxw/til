## GORM save
[文档说明](https://gorm.io/zh_CN/docs/update.html#%E4%BF%9D%E5%AD%98%E6%89%80%E6%9C%89%E5%AD%97%E6%AE%B5) `save`方法会保存所有的字段，即使字段是零值。

实际使用下来发现，`Save`在主键存在的时候也会执行`create`，不要轻易使用`Save`。
使用`Select("*")`配合`Update`或`Updates`来更新保存字段。

