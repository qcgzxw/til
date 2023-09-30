## react setstate对象时不更新
> React组件的更新机制对state只进行浅对比，也就是更新某个复杂类型数据时只要它的引用地址没变，那就不会重新渲染组件。

```js
this.setState(prevState => ({
    jasper: {                   // object that we want to update
        ...prevState.jasper,    // keep all other key-value pairs
        name: 'something'       // update the value of specific key
    }
}))
```
