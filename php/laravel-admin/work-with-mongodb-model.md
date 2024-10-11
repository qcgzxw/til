## Laravel-admin使用[MongoDB](https://github.com/mongodb/laravel-mongodb)的模型时，filter会失效
在Laravel-admin使用filter时，如果model是MongoDB，则可能会失效。

查询其sql log时发现，字段默认加上了表名。如：
```php
db_name.count({"$and":[{"db_name.cond1":"1"},{"db_name.cond2":"ALL"}]}) {"bindings":[],"time":1.97,"connectionName":"mongodb"}
```
可以使用laravel-admin Filter的where函数自定义查询字段
使用filter where自定义查询字段

```php
$grid->filter(function (Grid\Filter $filter) {
            $filter->where(function($query){
                $query->where('cond1', $this->input);
            }, __('Cond 1'), 'cond2');
            $filter->where(function($query){
                $query->whereIn('cond2', $this->input);
            }, __('Cond 2'), 'cond2')
                ->multipleSelect(['ALL', 'ONE', 'TWO', 'THREE']);
        });
```

