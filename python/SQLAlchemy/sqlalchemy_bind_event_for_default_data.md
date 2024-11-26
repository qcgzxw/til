## 使用 SQLAlchemy 自动绑定事件到具有 `insert_default_data` 方法的类

在使用 SQLAlchemy 时，可以查找具有 `insert_default_data` 方法的模型类，并将其绑定到 `after_create` 事件，以便在表创建后执行默认数据插入逻辑。

### 实现代码

以下是实现的完整代码示例：

```python
from sqlalchemy import event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import mapper

Base = declarative_base()

def bind_insert_default_data_event():
    """
    自动查找所有具有 `insert_default_data` 方法的类，
    并将其绑定到 `after_create` 事件。
    """
    for cls in Base.registry.mappers:
        model_class = cls.class_
        if hasattr(model_class, 'insert_default_data'):
            event.listen(
                model_class.__table__,
                'after_create',
                model_class.insert_default_data
            )

# 示例模型
class ExampleModel(Base):
    __tablename__ = 'example'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    @staticmethod
    def insert_default_data(target, connection, **kw):
        """
        插入默认数据的方法，绑定到 `after_create` 事件。
        """
        connection.execute(
            target.insert().values([
                {"id": 1, "name": "Default 1"},
                {"id": 2, "name": "Default 2"}
            ])
        )

# 在调用表创建之前绑定事件
bind_insert_default_data_event()

# 创建所有表
Base.metadata.create_all(engine)

