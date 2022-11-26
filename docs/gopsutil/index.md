---
title: Gopsutil
slug: /gopsutil
---

## 简介

`gopsutil`是 Python 工具库[psutil](https://link.zhihu.com/?target=https%3A//github.com/giampaolo/psutil) 的 Golang 移植版，可以帮助我们方便地获取各种系统和硬件信息。`gopsutil`为我们屏蔽了各个系统之间的差异，具有非常强悍的可移植性。有了`gopsutil`，我们不再需要针对不同的系统使用`syscall`调用对应的系统方法。更棒的是`gopsutil`的实现中没有任何`cgo`的代码，使得交叉编译成为可能。

此文档部分参考：[psutil_doc](https://hellowac.github.io/psutil_doc/index.html)

Github地址：[github](https://github.com/shirou/gopsutil)

## 快速使用

```bash
go get github.com/shirou/gopsutil/v3
```

## 目录说明

>   文档完善进度，未完成部分因未使用到，如有需要github提issue立即新增~

-   [x] `cpu` 获取CPU相关信息
-   [x] `disk` 获取硬盘相关信息
-   [ ] `docker` 获取Docker相关信息
-   [x] `host` 获取主机相关信息
-   [x] `mem` 获取内存相关信息
-   [ ] `net` 获取网卡相关信息
-   [x] `process` 获取进程相关信息
-   [x] `load` 可能是系统杂项信息
-   [ ] `winservices` Windows 服务相关

```go
package main

import (
    "fmt"

    "github.com/shirou/gopsutil/v3/mem"
    // "github.com/shirou/gopsutil/mem"  // to use v2
)

func main() {
    v, _ := mem.VirtualMemory()

    // almost every return value is a struct
    fmt.Printf("Total: %v, Free:%v, UsedPercent:%f%%\n", v.Total, v.Free, v.UsedPercent)

    // convert to JSON. String() is also implemented
    fmt.Println(v)
}
```



## V3版本

>   从v3.20.10 开始，gopsutil 变成了 v3，这打破了旧版本的兼容性。

## 可用系统架构

-   FreeBSD i386/amd64/arm
-   Linux i386/amd64/arm
-   Windows i386/amd64/arm/arm64
-   Darwin amd64/arm64
-   OpenBSD amd64
-   Solaris amd64

## 参考库

-   psutil: https://github.com/giampaolo/psutil
-   dstat: https://github.com/dagwieers/dstat
-   gosigar: https://github.com/cloudfoundry/gosigar/
-   goprocinfo: https://github.com/c9s/goprocinfo
-   go-ps: https://github.com/mitchellh/go-ps
-   ohai: https://github.com/opscode/ohai/
-   bosun: https://github.com/bosun-monitor/bosun/tree/master/cmd/scollector/collectors
-   mackerel: https://github.com/mackerelio/mackerel-agent/tree/master/metrics
