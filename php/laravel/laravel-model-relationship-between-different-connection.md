### laravel 模型关联
使用 `setConnection`函数来连接不同的数据库模型

```php
// 注意：频繁的使用不同的数据库连接可能导致未知问题。
//     如在MongoDB Model里设置mysql的连接 `setConnection`
public function user()
{
        return $this->setConnection('mysql')->belongsTo(User::class, 'user_id', 'id');
}
```
