## React Native 数据库 Provider 位置

React Native 数据库连接应该使用上下文 Provider 包裹在 root layout 外层。

### 问题

如果数据库 Provider 放在 root layout 内部，可能导致连接初始化时机不对或无法全局访问。

### 解决方案

将数据库 Provider 放在最外层：

```tsx
// _layout.tsx 或入口文件
export default function RootLayout() {
  return (
    <DatabaseProvider>
      <ReactNativePaperProvider>
        {/* 其他 providers */}
        <Stack />
      </ReactNativePaperProvider>
    </DatabaseProvider>
  );
}
```

**关键点**：数据库 Provider 应该是最外层的 Provider 之一。
