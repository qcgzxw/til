## 微信开发者工具模拟长按时，触发右键弹出菜单
在使用微信开发者工具模拟移动端长按时，会触发鼠标右键点击的操作，弹出菜单。
测试长按的时候我们需要在开发者工具console里临时重写 **document.oncontextmenu** 来避免弹出菜单

```js
document.oncontextmenu = function (e) {
  return false
  //或者 e.preventDefault()
}
```

[js禁止鼠标右键方法](https://blog.csdn.net/wwppp987/article/details/125842951)

