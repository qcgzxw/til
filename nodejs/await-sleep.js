# 使用 `new Promise` 实现 `await sleep` 功能

在 JavaScript 中，想要实现异步延迟（类似于 Python 的 `await asyncio.sleep()`），可以通过 `Promise` 来封装一个 `sleep` 函数，配合 `async/await` 使用。

## 实现方式

```js
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## 使用示例

```js
async function main() {
  console.log('Start');
  await sleep(1000);  // 暂停 1 秒
  console.log('1 second passed');
}

main();
```

## 说明

* `sleep(ms)` 返回一个 Promise；
* `setTimeout(..., ms)` 会在指定毫秒数后调用 `resolve()`；
* 在 `async` 函数中使用 `await sleep(...)` 可实现“暂停执行”的效果；
* 不会阻塞主线程，是非阻塞的异步延迟。

## 常见用途

* 节流请求 / 等待操作完成；
* UI 动画间隔控制；
* 接口重试、轮询等异步场景。

