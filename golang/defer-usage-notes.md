## defer 使用注意事项

## 1. defer 可以修改定义类型的返回值

```go
package main

func example() (result int) {
    defer func() {
        result++
    }()
    return 0
}

// 返回 1
```

## 2. 为避免未知错误和程序可读性下降，defer 不应过多处理返回值
```go
func example() (result int) {
    defer func() {
        if result < 0 {
            result = 0
        }
    }()
    // 其他逻辑
    return -1
}
// 返回 0
// 复杂逻辑下，defer 修改返回值可能引发难以追踪的问题

```

