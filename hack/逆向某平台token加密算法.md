## 逆向某平台加密算法
通过创建多个账号发现sign全是不固定长度的数字加字母
形如：
```js
## 01222333444666677889abbccdddeeeffstt
## 00000011112233334444555666667778899aaccccef
```
猜测可能与出现次数和字符有关

### 找规律
序号 | user | pass | sign
--- | --- | --- | --- 
1 | test | test | 01222333444666677889abbccdddeeeffstt
2 | test | test1 | 0001122223455566788899aaabdddeeeestt
3 | test | test2 | 000112222333456778888999aaabbbdefstt
4 | test1 | test | 011222333444666677889abbccdddeeeffstt
5 | test1 | test1 | 00011122223455566788899aaabdddeeeestt
6 | test1 | test2 | 0001112222333456778888999aaabbbdefstt

---

对比1️⃣、4️⃣发现,4️⃣比1️⃣多个`1`

验证2️⃣和5️⃣，发现正确

且用户名里的所有字符必然出现在sign里

---

序号 | user | pass | sign
--- | --- | --- | ---
1 | test | test | 01222333444666677889abbccdddeeff
2 | test | test1 | 0001122223455566788899aaabdddeee
3 | test | test2 | 000112222333456778888999aaabbbdf
4 | test1 | test | 01222333444666677889abbccdddeeff
5 | test1 | test1 | 0001122223455566788899aaabdddeee
6 | test1 | test2 | 000112222333456778888999aaabbbdf

---

去除sign里出现的user字符，发现sign还剩余32位，且只包含0-9和a-f，符合哈希特征，且密码相同的。

猜测剩余字符是密码的哈希后重排列。
```js
# 伪代码
md5('test')
# 098f6bcd4621d373cade4e832627b4f6
reorder('098f6bcd4621d373cade4e832627b4f6')
# 01222333444666677889abbccdddeeff
```
好在没有加salt，可以直接逆向验证。

## 加密算法
```html
<script src="https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js"></script>
<script>
  /**
   * 生成 nat 字符串
   * @param {string} password 用户密码
   * @param {string} username 用户名
   * @returns {string} nat 值
   */
  function generateNat(username, password) {
    // 1. 计算密码的 MD5（hex 小写）
    const md5Hash = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
    // 2. 拼接 MD5 + username
    const combined = md5Hash + username;
    // 3. 按字符拆分、ASCII 升序排序、再 join 回字符串
    return combined
      .split('')
      .sort()
      .join('');
  }

  console.log(generateNat('test', 'test'));
  console.log(generateNat('test', 'test1'));
  console.log(generateNat('test', 'test2'));
  console.log(generateNat('test1', 'test'));
  console.log(generateNat('test1', 'test1'));
  console.log(generateNat('test1', 'test2'));
</script>

```
