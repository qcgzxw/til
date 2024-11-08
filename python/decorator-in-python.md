# Python 装饰器的使用与注意事项

## 1. Python 装饰器

装饰器是一种用于修改函数或方法行为的高级工具。通过将装饰器函数应用到其他函数或方法上，可以实现逻辑的复用与代码的简化。

- 装饰器会修改被装饰函数的行为，需确保这种修改符合预期。
- 使用 functools.wraps 可以保留原函数的元信息，例如名称和文档字符串

示例：
```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Function is being called")
        result = func(*args, **kwargs)
        print("Function has finished")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# 输出：
# Function is being called
# Hello!
# Function has finished
```

## 带参数的装饰器
带参数的装饰器用于为装饰器函数添加自定义的参数，以控制其行为。它本质上是一个返回装饰器的高阶函数。

- 带参数的装饰器需要多一层函数，第一层接收参数，第二层作为装饰器。
- 参数化装饰器在调用时必须传参，即使是默认值，否则会报错。

示例：
```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def greet():
    print("Hello!")

greet()
# 输出：
# Hello!
# Hello!
# Hello!
```

## 定义在类里面的装饰器
在类中定义的装饰器可以用于修改类内方法的行为，尤其在涉及类的实例状态时很有用。

- 在类中定义的装饰器需要将 `self` 作为第一个参数，以访问类的状态。
- 若装饰器不需访问实例状态，也可以用 `@staticmethod` 或 `@classmethod` 定义，避免传递 self。

```python
class MyClass:
    def method_decorator(self, func):
        def wrapper(*args, **kwargs):
            print("Calling method:", func.__name__)
            return func(*args, **kwargs)
        return wrapper

    @method_decorator
    def say_hello(self):
        print("Hello from method!")

obj = MyClass()
obj.say_hello()
# 输出：
# Calling method: say_hello
# Hello from method!

```
