## Windows 10 RDP 调优

## 参考资料
- [Reddit: Pushing RemoteFX to its limits](https://www.reddit.com/r/sysadmin/comments/fv7d12/pushing_remote_fx_to_its_limits/)
- [BetterRDP 项目](https://github.com/Upinel/BetterRDP)

## 使用 BetterRDP 的注册表文件
BetterRDP 项目提供了一组优化 Windows RDP 性能的注册表配置，可以直接使用其注册表文件进行调优。

### 操作步骤
1. 下载 [BetterRDP](https://github.com/Upinel/BetterRDP) 项目中的注册表文件。
2. 双击运行注册表文件，将优化设置导入到系统中。
3. 重启 Windows 系统以应用更改。

### 注意事项
- 确保在导入注册表文件前备份当前系统配置。
- 调优可能会根据系统硬件和网络条件有不同的效果，请根据实际情况调整。

### 核心优化点
- 设置 RDP 帧率为 60 FPS
- 提高系统响应度
- 设置 RDP Flow Control
- 设置 Flow Control Display Bandwidth
- 设置 Flow Control Channel Bandwidth
- 设置 Flow Control Charge Post Compression
- 移除 RDP 延迟
- 禁用 Windows 网络限速
- 启用大 MTU 包
- 禁用 WDDM 驱动（仅适用于 NVIDIA 显卡）
- 启用 UDP+TCP 传输
- 启用硬件加速
- 启用 H.264/AVC 444 模式
- 启用 H.264/AVC 硬件编码

有关更详细的配置说明，请参考 [BetterRDP 项目](https://github.com/Upinel/BetterRDP)。
