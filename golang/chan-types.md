## chan
### chan类型
channel 可以分为 3 种类型：
1. 只读 channel，单向 channel
2. 只写 channel，单向 channel
3. 可读可写 channel

channel 还可按是否带有缓冲区分为：
1. 带缓冲区的 channel，定义了缓冲区大小，可以存储多个数据
2. 不带缓冲区的 channel，只能存一个数据，并且只有当该数据被取出才能存下一个数据

```golang
// 只读 channel
var readOnlyChan <-chan int  // channel 的类型为 int

// 只写 channel
var writeOnlyChan chan<- int

// 可读可写
var ch chan int

// 或者使用 make 直接初始化
readOnlyChan1 := make(<-chan int, 2)  // 只读且带缓存区的 channel
readOnlyChan2 := make(<-chan int)   // 只读且不带缓存区 channel

writeOnlyChan3 := make(chan<- int, 4) // 只写且带缓存区 channel
writeOnlyChan4 := make(chan<- int) // 只写且不带缓存区 channel

ch := make(chan int, 10)  // 可读可写且带缓存区

ch <- 20  // 写数据
i := <-ch  // 读数据
i, ok := <-ch  // 还可以判断读取的数据
```

### chan导致死锁的原因
1. 读：未初始化的channel，读取里面的数据时，会造成死锁deadlock
2. 写：未初始化的channel，往里面写数据时，会造成死锁deadlock
3. 关闭：未初始化的channel，关闭该channel时，会panic

总结：channel定义后一定要初始化

### ref
<https://www.cnblogs.com/jiujuan/p/16014608.html>
