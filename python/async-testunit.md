## 继承unittest.IsolatedAsyncioTestCase类来测试异步函数
Python3.8 之后，可以使用unittest自带的IsolatedAsyncioTestCase类来测试异步函数。
### 函数执行顺序
在 IsolatedAsyncioTestCase 类中，新增`asyncSetUp`和`asyncTearDown`执行顺序如下：

1. **setUp**：在每个测试方法执行之前调用，用于初始化同步资源。由于是同步方法，不能直接执行异步操作。
2. **asyncSetUp**：在 setUp 之后调用的异步初始化方法，适用于异步操作的初始化，例如创建用户等。
3. **测试方法**（test_*）：每个测试方法按照命名顺序依次执行, 注意，每次运行一个test函数都会执行 setUp asyncSetUp asyncTearDown tearDown 。
4. **asyncTearDown**：在测试方法执行完毕后调用的异步清理方法，用于清除异步创建的资源。
5. **tearDown**：在 asyncTearDown 之后调用的同步清理方法，用于清理同步资源。

### 示例代码
```python
import unittest

from app.config import CONFIG
from app.external import Emby


class EmbyBase(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.emby = Emby(CONFIG.emby_base_url, CONFIG.emby_api_key)


class TestEmbyUser(EmbyBase):
    TEST_USER_NAME = "embybot_test"
    TEST_USER_PASSWORD = "embybot_test"

    async def asyncSetUp(self):
        self.emby = Emby(CONFIG.emby_base_url, CONFIG.emby_api_key)
        user = self.emby.user
        res = await user.create_user(self.TEST_USER_NAME)
        self.user_id = res.id

    async def asyncTearDown(self):
        if self.user_id is not None:
            user = self.emby.user
            await user.delete_user(self.user_id)

    async def test_o1_get_user_by_emby_id(self):
        res = await self.emby.user.get_user_by_emby_id(self.user_id)
        self.assertEqual(res.name, self.TEST_USER_NAME)
```

