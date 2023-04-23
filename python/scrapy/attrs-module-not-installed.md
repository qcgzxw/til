## 问题
安装scrapy2.8.0之后一直提示`ModuleNotFoundError: No module named 'attrs'`

## 原因
attrs版本太久，需要手动升级
```python
pip3 install --upgrade attrs
```
