## PHP 7.1+ 中 `catch` 支持多个异常类型

从 PHP 7.1 开始，`catch` 块可以捕获多个异常类型。通过使用 `|` 符号分隔异常类型，开发者可以简化需要针对多种异常执行相同处理逻辑的代码。

---

### 示例代码

以下是使用多个异常类型的示例：

```php
try {
    // 可能抛出不同类型的异常
    throw new RuntimeException("Runtime error occurred");
} catch (RuntimeException | InvalidArgumentException $e) {
    // 针对 RuntimeException 和 InvalidArgumentException 执行相同的处理
    echo "Caught exception: " . $e->getMessage();
} catch (Exception $e) {
    // 处理其他所有异常类型
    echo "Caught generic exception: " . $e->getMessage();
}
```

