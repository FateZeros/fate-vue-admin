# redis 下载及安装

[redis 官网](https://redis.io)

redis 优点：

1. 性能高，读取速度快。
2. 所有指令都是原子级，支持多个操作事务，使用 MULTI 和 EXEC。
3. 支持数据的持久化，将内存的数据保存在磁盘上，重启的时候重新加载。
4. 支持数据的备份，即 master-slave 模式的备份。
5. 支持多种数据类型，string，hash，set，list，zset。

## 下载 & 安装

在官网下载 redis 安装包后，将包拷贝到 `usr/local` 文件夹下

```bash
cd /usr/local/[redis 版本文件夹]

make

sudo make install
```

设置 redis 守护进程开关，修改 `redis.conf` 文件

```
daemonize on => daemonize yes
```

## redis 命令

[redis start](https://redis.io/docs/getting-started/)

测试 redis，可以运行 redis-cli 客户端

```bash
> redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> exit
```

开启/关闭 redis 服务

```bash
// 开启 redis 服务
redis-server

// 后台启动 redis
redis-server &

// 带配置服务的重启
redis-server /usr/local/redis-6.0.20/redis.conf &

// 关闭 redis 服务
> redis-cli
> shutdown
> exit 
```

查看 redis 服务

```bash
// 再次启动
redis-server

ps -ef | grep redis
```

## 配置 redis disk 保存目录

```bash
cd /usr/local/redis

vi redis.conf

dir [redis-db 文件夹]
```


## 参考

[mac os 安装 redis](https://www.jianshu.com/p/3bdfda703552) </br>
[redis 相关命令](https://blog.csdn.net/JacaCao/article/details/111595360) </br>
[redis 相关配置](https://cloud.tencent.com/developer/article/1506991)</br>