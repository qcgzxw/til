# Flask 路由规则详解（包含 `path` 匹配所有路径的用法）

Flask 使用 `@app.route()` 装饰器定义路由规则。在定义路由时，可以使用多种 **转换器（converter）** 来指定 URL 中变量的类型和匹配方式。

---

## 常见路由匹配规则

Flask 路由变量的基本语法：

```
/<converter:variable_name>
```

### 1. 常用转换器类型

| 类型       | 说明                   | 示例匹配                 |
| -------- | -------------------- | -------------------- |
| `string` | 匹配非 `/` 的任意字符串（默认）   | `/user/hello`        |
| `int`    | 匹配整数                 | `/post/123`          |
| `float`  | 匹配浮点数                | `/price/3.14`        |
| `path`   | 匹配包含斜杠 `/` 的路径（多级路径） | `/files/a/b/c.txt`   |
| `uuid`   | 匹配 UUID 字符串          | `/uuid/550e8400-...` |

> 默认转换器是 `string`，即 `<username>` 等同于 `<string:username>`

---

## 2. 使用 `path` 匹配任意路径（包括斜杠）

当你希望某个路由能够匹配任意路径（例如文件路径、动态多级URL等），应使用 `path` 转换器。

### 示例：匹配任意路径

```python
from flask import Flask

app = Flask(__name__)

@app.route('/static/<path:filepath>')
def serve_file(filepath):
    return f"Requested file path: {filepath}"
```

访问示例：

* `/static/foo.txt` → `filepath = "foo.txt"`
* `/static/images/logo.png` → `filepath = "images/logo.png"`
* `/static/a/b/c/d.txt` → `filepath = "a/b/c/d.txt"`

---

## 3. 匹配根路径和任意子路径（catch-all）

如果希望根路径 `/` 也能匹配，同时能匹配任意深度路径，可以写两个路由：

```python
@app.route('/')
@app.route('/<path:subpath>')
def catch_all(subpath=''):
    return f"Path: /{subpath}"
```

这段代码会匹配：

* `/` → `subpath = ""`
* `/foo` → `subpath = "foo"`
* `/foo/bar` → `subpath = "foo/bar"`

---

## 4. 捕获所有请求（通配所有路径）

如果你希望捕获所有 URL，可以使用如下方式（适用于404兜底、自定义路由系统等场景）：

```python
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return f"Requested path: /{path}"
```

---

## 5. 补充：多个变量的使用

```python
@app.route('/user/<string:username>/post/<int:post_id>')
def user_post(username, post_id):
    return f"User: {username}, Post ID: {post_id}"
```

---

## 小结

| 场景             | 推荐写法                         |
| -------------- | ---------------------------- |
| 匹配不含 `/` 的字符串  | `<string:name>`（默认可省略）       |
| 匹配整数字段         | `<int:id>`                   |
| 匹配路径（可含多个 `/`） | `<path:filepath>`            |
| 匹配任意路径（含根路径）   | `/` + `/<path:...>` 搭配使用     |
| 匹配所有未知路径       | `@app.route('/<path:path>')` |

> 使用 `path` 转换器是处理任意子路径（如动态页面、静态文件、proxy等）的最佳选择。

