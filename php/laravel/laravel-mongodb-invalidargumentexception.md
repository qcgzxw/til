# Laravel + MongoDB 报错：InvalidArgumentException: Expected integer or object, string given

## 问题描述

在使用 [jenssegers/laravel-mongodb](https://github.com/jenssegers/laravel-mongodb) 扩展包时，某些 PHP 版本（如 PHP 8.1+）在调用 `save()` 或使用 `updateOrCreate()` 时，会出现如下报错：

```
MongoDB\Driver\Exception\InvalidArgumentException: Expected integer or object, string given
```

堆栈指向：

```php
MongoDB\BSON\UTCDateTime->__construct()
Jenssegers\Mongodb\Eloquent\Model->freshTimestamp()
```

## 触发条件

- 使用 `$model->timestamps = true`（默认开启）
- Laravel 自动调用 `freshTimestamp()` 返回当前时间戳
- MongoDB 扩展期望 UTCDateTime 类型，但某些 PHP 配置或 Laravel 版本返回字符串时间戳（如 `"2024-01-01 00:00:00"`）

## 解决方案

### 在model基类重写 `freshTimestamp()`

```php
use MongoDB\BSON\UTCDateTime;

public function freshTimestamp()
{
    return new UTCDateTime((int) now()->format('Uv')); // 强制转 int 即可
}
```

## 总结

此问题由 Laravel 和 MongoDB 扩展类型期望不一致引发，常见于高版本 PHP。推荐方式是手动指定时间戳类型，避免 Laravel 默认行为产生冲突。

