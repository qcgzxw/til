## Laravel Job 异常处理与重试次数限制

在 Laravel 队列中，如果 `Job` 执行过程中抛出了异常，默认会根据队列驱动配置的重试次数重新尝试执行该 `Job`。为避免异常导致 `Job` 被无限重试或持续失败，建议对异常进行手动处理，并限制最大重试次数。

可以尝试：
1. 手动处理程序异常，异常自动记录日志，func handle 不抛出异常
2. 使用 `public $tries = 3` 限定重试次数
3. 配置 `failed_jobs` 数据表，使用 `$this->fail($e);` 标记任务失败并保存至数据库方便排查问题

### Laravel Job 的默认行为

当 `Job` 执行抛出异常时：
- Laravel 会捕获异常并自动根据配置重试。
- 重试次数由队列配置的 `tries` 或 `retry_after` 参数控制。

配置示例（`config/queue.php`）：
```php
'connections' => [
    'database' => [
        'driver' => 'database',
        'table' => 'jobs',
        'queue' => 'default',
        'retry_after' => 90, // 任务超时（秒）
    ],
],
```
### 限制重试次数
```php
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;

class ExampleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public $tries = 3; // 最大重试次数

    public function handle()
    {
        // 业务逻辑
        throw new \Exception('Job failed'); // 模拟异常
    }
}
```
### handle示例
```php
public function handle()
{
    try {
        // 执行业务逻辑
    } catch (\Exception $e) {
        // 记录异常日志或执行其他逻辑
        \Log::error('Job failed with exception: ' . $e->getMessage());

        // 手动释放或删除 Job
        $this->fail($e); // 将任务标记为失败
    }
}
```

