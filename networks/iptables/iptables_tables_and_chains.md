# iptables四表五链
## 链的概念
在防火墙中，用户想要成功进入内网环境，就需要发送请求报文，请求报文要和防火墙设置的各种规则进行匹配和判断，最后执行相应的动作（放行或者拒绝）。一个防火墙中通常针对不同的来源设置多种策略，多个策略形成一个链，其实也可以理解成是分组的概念。

当数据报文进入链之后，首先匹配第一条规则，如果第一条规则通过则访问，如果不匹配，则接着向下匹配。如果链中的所有规则都不匹配，那么就按照链的默认规则处理数据报文的动作。

---

### Iptables五种链

- **INPUT**：从外界进入防火墙的数据包会应用此规则链中的策略。
- **OUTPUT**：当前服务器从防火墙外出的数据包会应用此规则链中的策略。
- **FORWARD**：转发数据包时会应用此规则链中的策略。
- **PREROUTING**：主机外的报文要进入防火墙，所有的数据包进来的时候都会由PREROUTING链进行处理。
- **POSTROUTING**：主机内的报文要从防火墙出去，需要经过POSTROUTING链进行处理。
---

### Iptables数据流向经过的链
```
--->PREROUTING------>[ROUTE]------->FORWARD------------>POSTROUTING------>
      raw               |            mangle           ^    mangle
      mangle            |            filter           |    nat
      nat               |                             |
                        |                          [ROUTE]
                        v                             |
                      INPUT  mangle                 OUTPUT  raw
                        |    nat                      ^     mangle
                        |    filter                   |     nat
                        v ------------>local--------->|     filter
```

![https://raw.githubusercontent.com/hcldirgit/image/refs/heads/master/iptables%E8%AF%A6%E8%A7%A3/01.png](https://raw.githubusercontent.com/hcldirgit/image/refs/heads/master/iptables%E8%AF%A6%E8%A7%A3/01.png)

从外界到达防火墙的数据包，先被PREROUTING规则链处理（是否修改数据包地址等），之后会进行路由选择（判断该数据包应该发往何处）。

【入站数据】即进行路由选择时如果数据包的目标是本机local（可以理解为数据的目标地址是路由器本机地址，换句话说就是访问路由器自身的数据），内核就将其传给INPUT链处理（决定是否允许通过等），通过以后再交给local系统上层的应用程序（可以理解为路由器本机的应用程序，如路由的web页面）进行响应。

【出站数据】即local响应完成后如果需要发出数据包（可以理解为数据的源地址是路由器本机地址，换句话说就是路由器自身发出的数据），就交给OUTPUT规则链，验证通过之后进行路由选择，然后传递给POSTROUTING规则链（是否修改数据包的地址等）进行处理。

【转发】即进行路由选择时如果数据包的目标地址是其它外部地址（可以理解为数据的源地址和目标地址都不是路由器本机地址，换句话说就是结果路由器自身的数据），则内核将其传递给FORWARD链进行处理（是否转发或拦截），然后再交给POSTROUTING规则链（是否修改数据包的地址等）进行处理。
  
## 表的概念

表的创建是为了管理这些链，并根据不同的处理需求进行区分。每个表都有其特定的用途，确保数据包在不同阶段的处理符合预定的策略。具体来说，表的作用是为不同的链提供“上下文”或环境，使得每个链可以对数据包执行不同类型的操作。

### 4种表
1. filter表——三个链：INPUT、FORWARD、OUTPUT
作用：过滤数据包，内核模块：iptables=_filter

2. Nat表——三个链：PREROUTING、POSTROUTING、OUTPUT
作用：用于网络地址转换（IP、端口），内核模块：iptable_nat

3. Mangle表——五个链：PREROUTING、POSTROUTING、INPUT、OUTPUT、FORWARD
作用：修改数据包的服务类型、TTL，并且可以配置路由实现QOS，内核模块：iptable_mangle（设置策略时几乎不会用到它）

4. Raw表——两个链：OUTPUT、PREROUTING
作用：决定数据包是否被状态跟踪机制处理，内核模块：iptable_raw（用得不多）

### 表的顺序
Raw——Mangle——Nat——Filter

## 参考
- <https://hcldirgit.github.io/2017/10/13/2.%20Linux%20%E5%91%BD%E4%BB%A4/81.%20iptables%E8%AF%A6%E8%A7%A3/>
- <https://www.right.com.cn/forum/thread-8183481-1-1.html>
- <https://juejin.cn/post/7129337209299140639>

