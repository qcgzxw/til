# Ubuntu 使用 clip 命令导出到剪切板

在 Ubuntu 中，可以使用 `xclip` 或 `xsel` 等工具将命令输出内容直接复制到剪贴板。为了方便使用，可以将其封装成 bash alias。

## 安装 xclip

```bash
sudo apt install xclip
```

## 示例：将文本输出复制到剪贴板

```bash
echo "hello clipboard" | xclip -selection clipboard
```

## 添加 bash alias

编辑 `~/.bash_aliases` 文件，添加如下内容：

```bash
alias clip="xclip -selection clipboard"
alias copy-diff='git diff | xclip -selection clipboard'
```

使其生效：

```bash
source ~/.bash_aliases
```

现在可以这样使用：

```bash
echo "copied content" | clip
```

## 补充说明

- `-selection clipboard` 指定使用系统剪贴板（而非默认的 X11 选择区）。
- 可用于管道命令，如将某文件内容复制到剪贴板：

```bash
cat ~/.ssh/id_rsa.pub | clip
```

非常适合快速分享 SSH 公钥、配置片段等内容。

