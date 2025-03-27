## Fcitx5 在Ubuntu下的一些问题汇总

### Fcitx5 开机自启
需要安装gnome-tweak-tool
```bash
apt-get install gnome-tweak-tool
```
在 `开机启动程序`，添加fcitx5
```
/usr/bin/fcitx5
```

### Fcitx5 界面优化
https://extensions.gnome.org/extension/261/kimpanel/

### 部分软件无法切换中文
环境变量的问题，新增或者编辑`~/.pam_environment`文件
```bash
vim ~/.pam_environment
# 插入
#  GTK_IM_MODULE DEFAULT=fcitx
#  QT_IM_MODULE  DEFAULT=fcitx
#  XMODIFIERS    DEFAULT=@im=fcitx
```

## 参考
- https://muzing.top/posts/3fc249cf/
