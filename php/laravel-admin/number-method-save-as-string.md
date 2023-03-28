## 表单无法保存字符串类型
laravel-admin `$form->number()`函数上传的是字符串，导致保存json格式数据时，值为字符串。

例如
```json
{"number":"123"}
```

暂时使用setAttribute函数手动转换成int格式。
```php
public function setParamsAttribute($value)
    {
        if (isset($value['number'])) {
            $value['number'] = intval($value['number']);
        }
        $this->attributes['params'] = $value ? json_encode($value): null;
    }
```

