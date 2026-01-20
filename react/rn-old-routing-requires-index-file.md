## React Navigation 旧路由模式需要 index 文件

React Navigation 旧的路由模式（文件路由）必须在 `layout.tsx` 同级目录下有 `index.tsx`，否则无法加载所有路由。

### 问题

当使用基于文件的路由时，如果只有 `layout.tsx` 而没有 `index.tsx`，路由不会正常工作。

### 解决方案

确保目录结构如下：

```
app/
├── layout.tsx
└── index.tsx  # 必需
```
