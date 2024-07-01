## parseInt()方法
`parseInt`返回值为`int|NaN`

对于不符合要求的值，`parseInt`返回`NaN`。区别于php里的`intval`

```js
const a = null;
const b = 123;
console.log(parseInt(a)); // NaN
console.log(parseInt(a) | 0); // 0
console.log(isNaN(parseInt(a)) ? 0 : parseInt(a)); // 0
console.log(isNaN(parseInt(b)) ? 0 : parseInt(b)); // 123

// 定义getNumber永远返回数字
static getNumber(value, defaultValue = 0) {
    const num = parseInt(value, 10);
    return isNaN(num) ? defaultValue : num;
  }

```
