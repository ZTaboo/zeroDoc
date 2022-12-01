---
title: Golang切片与数组比较
description: Golang切片与数组比较
tags: 
  - golang
---

## 不同处

```go
package main

import "fmt"

func main() {
	slice1 := [...]int{1, 2, 3, 4, 5}
    fmt.Println(cap(slice1), len(slice1))
    slice2 := []int{1, 2, 3, 4, 5}
    fmt.Println(cap(slice2), len(slice2))
    slice2 = append(slice2, 6)
    fmt.Println(cap(slice2), len(slice2))
}
```
> 输出：

```text
5 5 
5 5
10 6
```

### 简单总结

1. 数组因确定长度，无法使用`append`添加元素，只能指定索引用于赋值
2. 数组初始化可以指定长度或者使用`...` 让编译器计算长度来初始化数组长度与值
3. 切片的长度和容量是不一定一致的，容量是根据初始切片长度来翻倍递增的

### 引申1

`[1]int`和 `[2]int` 是同样类型么？

```go
package main

import "fmt"

func main() {
	var a [1]int
	var b [2]int
	if a == b {
		fmt.Println("is ok")
	}else{
		fmt.Println("is no")
	}
}

```
> output

```bash
main.go:8:10: invalid operation: a == b (mismatched types [1]int and [2]int)
```
> 结论：

1. 数组可以比较，但前提是长度相同。数组的长度是类型的一部分，因此长度不相同的数组是不相同的。如果长度相同，则会按照内容对比
2. 切片不可以比较