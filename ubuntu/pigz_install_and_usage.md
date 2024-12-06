## Pigz 的安装与使用

`pigz` 是 `gzip` 的多线程实现，可以充分利用多核 CPU 提高压缩和解压缩的性能。相比 `gzip`，在多核环境下 `pigz` 的性能提升极其明显。

---

### 安装
```bash
sudo apt install pigz
```

### 性能简单对比
![e42f4a0a22d5b74ce8f8e234d1661dca.png](https://image.qcgzxw.cn/data-image/2024/12/06/e42f4a0a22d5b74ce8f8e234d1661dca.png)
![96e48c7d1cbd1911ef3e8d6e69b91886.png](https://image.qcgzxw.cn/data-image/2024/12/06/96e48c7d1cbd1911ef3e8d6e69b91886.png)

pigz利用到所有CPU核心

![ae96fd4ebe05e814b1594cd3912f6c6a.png](https://image.qcgzxw.cn/data-image/2024/12/06/ae96fd4ebe05e814b1594cd3912f6c6a.png)

