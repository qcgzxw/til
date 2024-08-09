## go1.18新增any、comparable类型

<https://go.dev/doc/tutorial/generics>

Golang终于增加对泛型的支持，可以减少很多复用代码。
```go
// InArray func in Go1.14
func UintInArray(a []uint, needle uint) (isInArray bool) {
	if a == nil || len(a) == 0 {
		return
	}
	for _, item := range a {
		if item == needle {
			return true
		}
	}
	return
}
func Int64InArray(a []int64, needle int64) (isInArray bool) {
	if a == nil || len(a) == 0 {
		return
	}
	for _, item := range a {
		if item == needle {
			return true
		}
	}
	return
}
func Uint8InArray(a []uint8, needle uint8) (isInArray bool) {
	if a == nil || len(a) == 0 {
		return
	}
	for _, item := range a {
		if item == needle {
			return true
		}
	}
	return
}

// InArray func in Go1.18
func InArray[T comparable](a []T, needle T) bool {
	if a == nil || len(a) == 0 {
		return false
	}
	for _, item := range a {
		if item == needle {
			return true
		}
	}
	return false
}

```

