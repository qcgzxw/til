## Spotify 高分屏缩放
Spotify在高分屏下缩放异常，图标和布局过大，修改桌面图标解决。

```shell
# 测试缩放倍数
# spotify --force-device-scale-factor=1.25
# 修改桌面图标
sudo vim /usr/local/share/applications/spotify.desktop
# 指定缩放倍数
# Exec=spotify --force-device-scale-factor=1.25 %U
# 刷新图标
sudo update-desktop-database
```
