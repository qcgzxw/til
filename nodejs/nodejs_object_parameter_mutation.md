## Node.js 对象参数传入导致的值永久修改问题

在 Node.js 中，将对象作为参数传入函数时，如果对该对象进行了修改，这些修改会影响原始对象。这是因为对象在传递时是按**引用**传递的，即传递的是对象的内存地址，而不是对象的副本。

示例：
```javascript
function modifyObject(obj) {
    obj.value = 42;
}

const myObj = { value: 10 };
modifyObject(myObj);
console.log(myObj.value); // 输出：42
```

## 由此引出的浅层复制和深层复制问题
### 浅复制 Shallow Copy
- 浅层复制（Shallow Copy）：浅层复制只复制对象的第一层属性，对于嵌套对象，则只是复制它们的引用。因此，修改嵌套对象的值依然会影响到原对象。

浅层复制方法：
```bash
const shallowCopy = Object.assign({}, myObj);  // 或者 { ...myObj }
# 示例
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };
shallowCopy.b.c = 42;
console.log(original.b.c); // 输出：42

```

### 深复制 Deep Clone
- 深层克隆（Deep Clone）：深层克隆会递归复制所有嵌套的对象，生成一个完全独立的副本，因此修改克隆对象不会影响原对象。

深层克隆方法（示例方法）：
```bash
const original = { a: 1, b: { c: 2 } };
# 1. 使用json重新格式化
const deepClone = JSON.parse(JSON.stringify(original));
# 2. Node.js 8.0.0开始引入的 serialize 方法
const v8 = require('v8');
const buf = v8.serialize({a: 'foo', b: new Date()});
const cloned = v8.deserialize(buf);
cloned.b.getMonth();
# 3. v8.0.0以下版本使用 lodash.cloneDeep
const _ = require('lodash')

cloned = _.cloneDeep(original)

```

