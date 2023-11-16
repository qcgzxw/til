### laravel 模型关联
使用 `setConnection`函数来连接不同的数据库模型

```php
public function user()
    {
        return $this->setConnection('mysql')->belongsTo(User::class, 'user_id', 'id');
    }
```
