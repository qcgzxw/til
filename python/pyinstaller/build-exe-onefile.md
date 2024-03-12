## 编译exe程序
```cmd
# -F 打包成单个文件
# --onconsole 不显示控制台
# --add-data 额外文件，一般是其他依赖

pyinstaller -F --noconsole --add-data "./poppler;./poppler" main.py
```

```python
# 获取add-data的文件夹 
folder = pathlib.Path(__file__).parent.resolve()
print(f'{folder}/poppler')
```

