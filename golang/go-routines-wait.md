## goroutine线程调度
在执行golang command，涉及到goroutine处理的时候，主线程退出时，需要阻塞主线程或者使用channel和主线程通信等手段去等待子线程执行完毕，不然主线程退出时会kill掉子线程。

sync.WaitGroup
