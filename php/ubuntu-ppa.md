## ubuntu apt使用php三方源避免麻烦
### 问题描述
- Ubuntu22.04下使用`pecl`安装grpc扩展时，需要编译安装，超级费时间；
- `compsoer install`时遇到问题，扩展版本太低
### 解决方法
[How To Install PHP On Ubuntu 20.04 or 22.04](https://phoenixnap.com/kb/install-php-on-ubuntu)

```shell
sudo apt update && sudo apt upgrade
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

### ondrej/php 优点
- php扩展版本更新快
- 非官方php扩展无须编译，直接安装
