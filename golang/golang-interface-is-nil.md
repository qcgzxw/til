## golang定义返回接口时，空接口不一定为nil
- 代码规范，报错或者异常直接返回nil，避免导致问题
- `不推荐`专门写一个函数来判断接口nil

[如何判断一个 interface{} 的值是否为 nil ？](https://juejin.cn/post/7100078516334493733)

```go

type i interface {
}
type b struct {
}

func testNilInterface1() i {
	var c *b
	fmt.Println(c == nil) // true
	return c
}
func testNilInterface2() (a i) {
	return nil
}
func main() {
	fmt.Println(testNilInterface1() == nil) // false
	fmt.Println(testNilInterface2() == nil) // true
}
```
