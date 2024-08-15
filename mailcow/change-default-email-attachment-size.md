# 修改默认邮件附件大小

在 Docker 搭建的 Mailcow 中，修改默认的邮件附件大小需要进行以下配置：

1. 编辑 `data/conf/postfix/extra.cf` 文件，设置 `message_size_limit` 参数（单位：字节）。默认值可参考 `main.cf` 文件。

2. 修改 Rspamd 和 Clamav 的配置：

   - 在 `data/conf/rspamd/local.d/options.inc` 文件中添加 `max_message` 参数。
   - 在 `data/conf/rspamd/local.d/external_services.conf` 文件中调整 `max_size` 参数（针对 oletools）。
   - 在 `data/conf/rspamd/local.d/antivirus.conf` 文件中调整 `max_size` 参数（针对 clamav）。
   - 在 `data/conf/clamav/clamd.conf` 文件中调整 `MaxScanSize` 和 `MaxFileSize` 参数。

3. 重启 Postfix, Rspamd, 和 Clamav：
```bash
   docker compose restart postfix-mailcow rspamd-mailcow clamd-mailcow
```

