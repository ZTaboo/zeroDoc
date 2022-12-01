---
title: wsl系统版本转换 
description: wsl系统版本转换
tags:
    - 杂记
---

> 问题背景：某天在微软商店下载wsl ubuntu后发现wsl版本是1，再此记录下

## 查看wsl版本

```bash
wsl --list --verbose
```

## 设置指定wsl系统版本

```bash
wsl --set-version 分发版名称 版本号
```

> 例如：

```bash
wsl --set-version Ubuntu-18.04 2
```