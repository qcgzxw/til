## Http Client忘记关闭导致内存泄露
[记一次使用 Laravel Http Client 使用不当导致内存泄漏的问题](https://nowtime.cc/php/1854.html)

Laravel 的 HTTP Client 基于 Guzzle 二次封装。

```php

$url = 'https://xxxx/xxx.json';

$response = Illuminate\Support\Facades\Http::get($url);
$json = $response->json();

// 关闭 stream 否则导致oom
$response->close();

// TODO 业务逻辑处理
```

