## 手动指定EIO版本
```js
import { io } from 'socket.io-client';

// 指定 EIO 版本（例如兼容旧服务端使用 EIO v3）
const socket = io('http://localhost:3000', {
  query: {
    EIO: 3
  },
});

```

### 客户端与服务端版本关系表
| socket.io 版本 | 对应的 eio 协议版本（EIO） |
| ------------ | ----------------- |
| 2.x          | 3                 |
| 3.x          | 4                 |
| 4.x / 5.x    | 4                 |

