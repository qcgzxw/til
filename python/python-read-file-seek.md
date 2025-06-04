# 计算文件 MD5 时记得重置文件指针

在使用 Python 计算文件 MD5 哈希值时，常见的错误是忘记在读取文件后重置文件指针，导致后续读取为空或错误。

---

## 示例代码

```python
import hashlib

def get_md5(fobj):
    """计算文件对象的 MD5 值"""
    md5 = hashlib.md5()
    # 如果文件指针不在开头，哈希值会错误
    fobj.seek(0)
    while chunk := fobj.read(8192):
        md5.update(chunk)
    fobj.seek(0)  # 计算完成后可选地复位文件指针
    return md5.hexdigest()
```

---

## 错误示例（未重置文件指针）

```python
with open('example.txt', 'rb') as f:
    f.read()  # 文件指针已经移动到末尾
    md5 = get_md5(f)  # 此时 get_md5 读取为空，MD5 将不正确
```

---

## 正确写法

```python
with open('example.txt', 'rb') as f:
    md5 = get_md5(f)
    print("MD5:", md5)
```

---

## 总结建议

* 在处理文件哈希、上传前验证等场景中，如果你传递的是**文件对象而非文件路径**，一定要调用 `fobj.seek(0)` 保证指针位于文件开头。
* 读写复用文件对象时，也需注意文件指针的移动和复位。


