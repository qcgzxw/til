ikuai作为主路由，OpenWrt作为旁路由的模式下，指定网关为OpenWrt的设备在ikuai上无法获取其真实Mac地址，所有设备都展示为OpenWrt的Mac地址。

## 思路
- 确认设备是否有三层转发条件
- 旁路由是否开启了snmp
- 爱快里面是否做了相应的跨三层配置

## 过程
1. OpenWrt软件包搜索 `snmpd` 安装
2. 进入iKuai的管理后台，依次点击【高级应用】→【跨三层应用】→【添加】，在【SNMP服务器IP】后输入OpenWrt路由管理IP，其他保证默认不变，点击【保存】；
3. 回到ikuai设备列表，可以看到所有设备的真实MAC地址

## 参考
- https://www.luxiyue.com/openwrt/ikuai%E4%B8%8Eopenwrt%E4%B8%BB%E6%97%81%E8%B7%AF%E7%94%B1mac%E5%9C%B0%E5%9D%80%E4%BF%AE%E5%A4%8D/
