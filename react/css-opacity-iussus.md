## 问题：CSS 子元素受到父元素透明度的影响

### 描述

在CSS中，如果父元素设置了`opacity`属性，子元素的透明度也会受到影响。这是因为`opacity`属性会传递给子元素，即使在子元素上没有明确设置`opacity`。

### 解决方案

如果想要父元素有透明度，但子元素不受影响，可以使用其他方式来实现。例如，可以使用`rgba`颜色或者使用伪元素。

### 使用 `rgba` 颜色

```css
.parent {
  background-color: rgba(0, 0, 0, 0.5);
}

.child {
  background-color: #ffffff; /* 子元素的背景色 */
}
```

