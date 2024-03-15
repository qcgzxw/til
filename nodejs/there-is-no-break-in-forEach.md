## forEach中没有break方法提前中断循环

涉及到复杂的循环，需要continue或者break更改运行流程时，使用for！

```js
for (let a of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
  if (a % 2 > 0) {
    continue;
  } else {
    console.log(a);
    break;
  }
}

/*
result:
2
*/
```
```js
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((a) => {
  if (a % 2 > 0) {
    return true;
    // return true;  相当于continue
    // return false; 相当于continue
    // return;       相当于continue
  }
  console.log(a);
});
/*
result:
2
4
6
8
*/
```
