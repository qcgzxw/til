## 引入原生JS
在react开发过程中，经常遇到要引入原生js的情况，为了避免复杂重新写一个组件兼容，我们可以直接利用`document.head.appendChild`在useEffect中引入。

例如：
```js
const ttMiniPScript = (onLoadFn = null) => {
  const script = document.createElement("script");
  script.src = process.env.REACT_APP_BYTE_DANCE_JSSDK;
  script.async = true;
  script.onload = () => {
    onLoadFn && onLoadFn();
  }
  return script;
};
const isTTWebView = true; // 默认为true
useEffect(() => {
    if (isTTWebView) {
      document.head.appendChild(ttScript); 
    }
}, []);
```

但是由于React18新特性会导致useEffect在载入时会被执行两次
[React18的useEffect会执行两次](https://juejin.cn/post/7137654077743169573)

而多次引入一段js可能会导致类似报错'变量已声明'，这里暂时的解决方法是：在载入js时先判断是否已定义变量。
```js
useEffect(() => {
    if (isTTWebView) {
      if (typeof(tt) === "undefined") {
        // 避免多次加载
        document.head.appendChild(ttScript);
      } else {
        console.log(tt);
      }
    }
  }, []);
```

