---
title: /proc/meminfo 各字段详解
---

### $ cat /proc/meminfo

```
MemTotal:         877368 kB  ：所有可用RAM大小（即物理内存减去一些预留位和内核的二进制代码大小）（HighTotal + LowTotal）,系统从加电开始到引导完成，BIOS等要保留一些内存，内核要保留一些内存，最后剩下可供系统支配的内存就是MemTotal。这个值在系统运行期间一般是固定不变的。
MemFree:           22516 kB  ：LowFree与HighFree的总和，被系统留着未使用的内存,MemFree是说的系统层面
MemAvailable:     470244 kB  ：应用程序可用内存数。系统中有些内存虽然已被使用但是可以回收的，比如cache/buffer、slab都有一部分可以回收，所以MemFree不能代表全部可用的内存，这部分可回收的内存加上MemFree才是系统可用的内存，即：MemAvailable≈MemFree+Buffers+Cached，它是内核使用特定的算法计算出来的，是一个估计,MemAvailable是说的应用程序层面
Buffers:            1772 kB  ：用来给文件做缓冲大小
Cached:           459224 kB  ：被高速缓冲存储器（cache memory）用的内存的大小（等于 diskcache minus SwapCache ）
SwapCached:           16 kB  ：被高速缓冲存储器（cache memory）用的交换空间的大小，已经被交换出来的内存，但仍然被存放在swapfile中。用来在需要的时候很快的被替换而不需要再次打开I/O端口
Active:           333148 kB  ：在活跃使用中的缓冲或高速缓冲存储器页面文件的大小，除非非常必要否则不会被移作他用. (Active(anon) + Active(file))
Inactive:         330384 kB  ：在不经常使用中的缓冲或高速缓冲存储器页面文件的大小，可能被用于其他途径. (Inactive(anon) + Inactive(file))
Active(anon):     104368 kB  ：活跃的与文件无关的内存（比如进程的堆栈，用malloc申请的内存）(anonymous pages),anonymous pages在发生换页时，是对交换区进行读/写操作
Inactive(anon):   104508 kB  ：非活跃的与文件无关的内存（比如进程的堆栈，用malloc申请的内存）
Active(file):     228780 kB  ：活跃的与文件关联的内存（比如程序文件、数据文件所对应的内存页）(file-backed pages) File-backed pages在发生换页(page-in或page-out)时，是从它对应的文件读入或写出
Inactive(file):   225876 kB  ：非活跃的与文件关联的内存（比如程序文件、数据文件所对应的内存页）
Unevictable:        6708 kB  ：
Mlocked:            1428 kB  ：
HighTotal:        261888 kB  ：高位内存总大小（Highmem是指所有内存高于860MB的物理内存,Highmem区域供用户程序使用，或用于页面缓存。该区域不是直接映射到内核空间。内核必须使用不同的手法使用该段内存）
HighFree:           5680 kB  ：未被使用的高位内存大小
LowTotal:         615480 kB  ：低位内存总大小,低位可以达到高位内存一样的作用，而且它还能够被内核用来记录一些自己的数据结构
LowFree:           16836 kB  ：未被使用的低位大小
SwapTotal:        614396 kB  ：交换空间的总大小
SwapFree:         611044 kB  ：未被使用交换空间的大小
Dirty:                40 kB  ：等待被写回到磁盘的内存大小
Writeback:             0 kB  ：正在被写回到磁盘的内存大小
AnonPages:        209224 kB  ：未映射页的内存大小
Mapped:           280668 kB  ：设备和文件等映射的大小
Shmem:              1084 kB  ：
Slab:              59840 kB  ：内核数据结构缓存的大小，可以减少申请和释放内存带来的消耗
SReclaimable:      34196 kB  ：可收回Slab的大小
SUnreclaim:        25644 kB  ：不可收回Slab的大小（SUnreclaim+SReclaimable＝Slab）
KernelStack:        7504 kB  ：常驻内存,每一个用户线程都会分配一个kernel stack(内核栈)
PageTables:        15508 kB  ：管理内存分页页面的索引表的大小
NFS_Unstable:          0 kB  ：不稳定页表的大小
Bounce:                0 kB  ：
WritebackTmp:          0 kB  ：
CommitLimit:     1053080 kB  ：根据超额分配比率（'vm.overcommit_ratio'），这是当前在系统上分配可用的内存总量，这个限制只是在模式2('vm.overcommit_memory')时启用。CommitLimit用以下公式计算：CommitLimit =（'vm.overcommit_ratio'*物理内存）+交换例如，在具有1G物理RAM和7G swap的系统上，当`vm.overcommit_ratio` = 30时 CommitLimit =7.3G
Committed_AS:   16368536 kB  ：目前在系统上分配的内存量。是所有进程申请的内存的总和，即时所有申请的内存没有被完全使用，例如一个进程申请了1G内存，仅仅使用了300M，但是这1G内存的申请已经被 "committed"给了VM虚拟机，进程可以在任何时间使用。如果限制在模式2('vm.overcommit_memory')时启用，分配超出CommitLimit内存将不被允许
VmallocTotal:     245760 kB  ：可以vmalloc虚拟内存大小
VmallocUsed:           0 kB  ：vmalloc已使用的虚拟内存大小
VmallocChunk:          0 kB  ：最大的连续未被使用的vmalloc区域
```

>    Inactive(anon) 和 Inactive(file)，分别表示anonymous pages和mapped pages。

用户进程的内存页分为两种：与文件关联的内存（比如程序文件、数据文件所对应的内存页）和与文件无关的内存（比如进程的堆栈，用malloc申请的内存），前者称为file pages或mapped pages，后者称为anonymous pages；其中LRU lists包括如下几种，在/proc/meminfo中都有对应的统计值：

　　LRU_INACTIVE_ANON  –  对应 Inactive(anon)
　　LRU_ACTIVE_ANON  –  对应 Active(anon)
　　LRU_INACTIVE_FILE  –  对应 Inactive(file)
　　LRU_ACTIVE_FILE  –  对应 Active(file)
　　LRU_UNEVICTABLE  –  对应 Unevictable

Inactive list里的是长时间未被访问过的内存页，Active list里的是最近被访问过的内存页，LRU算法利用Inactive list和Active list可以判断哪些内存页可以被优先回收。

### MemAvailable

应用程序可用内存数。系统中有些内存虽然已被使用但是可以回收的，比如cache/buffer、slab都有一部分可以回收，所以MemFree不能代表全部可用的内存，这部分可回收的内存加上MemFree才是系统可用的内存，即：MemAvailable≈MemFree+Buffers+Cached，它是内核使用特定的算法计算出来的，是一个估计值。

### VmallocUsed

通过vmalloc分配的内存都统计在/proc/meminfo的 VmallocUsed 值中，但是要注意这个值不止包括了分配的物理内存，还统计了VM_IOREMAP、VM_MAP等操作的值，譬如VM_IOREMAP是把IO地址映射到内核空间、并未消耗物理内存，所以我们要把它们排除在外。从物理内存分配的角度，我们只关心VM_ALLOC操作，这可以从/proc/vmallocinfo中的vmalloc记录看到。

### KernelStack：

Kernel stack（内核栈）是常驻内存的，既不包括在LRU lists里，也不包括在进程的RSS/PSS内存里，所以我们认为它是kernel消耗的内存。统计值是/proc/meminfo的KernelStack。64bit 系统的 task_struct size 是16KB,  32bit的系统task_struct size为 8KB，每一个用户线程都会分配一个kernel stack（内核栈），内核栈虽然属于线程，但用户态的代码不能访问，只有通过系统调用(syscall)、自陷(trap)或异常(exception)进入内核态的时候才会用到，也就是说内核栈是给kernel code使用的。


内存黑洞：

进程通过将memoryinfo中的内存大小相加起来，发现总是比真实内存小，那是因为有内存黑洞的存在，我们知道，Kernel的动态内存分配通过以下几种接口：

alloc_pages/__get_free_page: 以页为单位分配

vmalloc: 以字节为单位分配虚拟地址连续的内存块

slab allocator

vmalloc和slab分配的内存都会被记录在meminfo中，但通过alloc_pages/__get_free_page分配的内存，没有在/proc/meminfo中统计，不知道有多少，就像个黑洞。