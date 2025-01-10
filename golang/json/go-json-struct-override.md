# Golang JSON 覆盖已存在字段的用法

## 概述
在 Golang 中，`encoding/json` 包提供了处理 JSON 数据的能力。使用 `json.Unmarshal` 方法可以将 JSON 数据解码到结构体中。在解码过程中，可以覆盖已存在的字段值。下面通过示例代码进行说明。

---

## 示例代码

```go
package main

import (
	"encoding/json"
	"fmt"
)

type Data struct {
	FieldA string `json:"a"` // JSON 键 "a" 对应的结构体字段
	FieldB string `json:"b"` // JSON 键 "b" 对应的结构体字段
}

func main() {
	// 初始化结构体
	data := &Data{
		FieldA: "originalA", // 原始值
		FieldB: "originalB", // 原始值
	}

	// JSON 数据，其中只覆盖 FieldA 的值
	jsonData := []byte(`{"a":"newA"}`)

	// 使用 json.Unmarshal 解码
	if err := json.Unmarshal(jsonData, data); err != nil {
		fmt.Println("Error:", err)
		return
	}

	// 打印解码后的结果
	fmt.Printf("FieldA: %s, FieldB: %s\n", data.FieldA, data.FieldB)
}

// 输出：FieldA: newA, FieldB: originalB

```
