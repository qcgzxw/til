## 微信小程序里的crypto库只提供基本的功能
在使用v9.0.1版uuid库的时候，微信小程序报错
```js
import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());
```

```js
 crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
    at rng (._node_modules_uuid_dist_esm-browser_rng.js:13)
    at v4 (._node_modules_uuid_dist_esm-browser_v4.js:11)
    at Proxy.loginByUuid (._src_pages_login_index.vue:85)
    at Proxy.onLoad (._src_pages_login_index.vue:176)
    at safeExecute (.._src_dsl_common.ts:57)
    at Proxy.<anonymous> (.._src_dsl_common.ts:155)(env: Windows,mp,1.06.2404301; lib: 3.4.2)
```

解决：使用旧版uuid^3.2.1
