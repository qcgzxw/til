## node中的this和js里的是不一样的
this在node.js里通常会被用来指向当前对象。但在情况复杂的时候，可能会发生改变。
例如在类A的的b函数，想要访问A的属性property而使用了 `this.property` 是没问题的；但是如果B函数里定义了一个回调函数c，此时在c里是无法通过this访问到A的。

为避免混淆，node.js常用 `const self=this;` 更换变量名的方法来使得子函数能访问到当前函数的this。
