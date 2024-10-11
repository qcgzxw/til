## Laravel-admin filter bug or feature?
在使用laravel-admin 编写filter条件的时候，偶然发现 **ignore()** 无法对 **in** 起作用

```php
$grid->filter(function(Grid\Filter $filter) {
    $filter->in('cond')->ignore()->select([0,1,2,3]); // 无效，依旧会使用这个查询条件
    $filter->equal('cond')->ignore(); // 生效，cond被忽略
});

```

