## Claude Code 测试命令持续执行问题

使用 Claude Code 或 antigravity 进行测试时，唤起的测试命令（如 `pytest`、`go test` 等）可能会在会话显示完成后继续执行，导致 **token 持续浪费**和**内存溢出**问题。

### 问题描述

- Claude Code 会话显示"已完成"
- 但后台的测试进程仍在运行
- 导致 token 持续消耗
- 可能导致内存溢出（OOM）

### 原因分析

某些测试命令（特别是 pytest、go test）可能：
1. 进入无限循环或挂起状态
2. 持续输出日志，消耗 token
3. 会话超时后进程未正确终止

### 解决方案

#### 1. 设置超时限制

使用 `timeout` 命令包装测试命令：

```bash
# pytest 设置超时（单位：秒）
timeout 60 pytest

# go test 设置超时
timeout 120 go test ./...
```

#### 2. 配置 pytest 超时

在 `pytest.ini` 或 `pyproject.toml` 中配置：

```ini
# pytest.ini
[pytest]
timeout = 60
```

或使用 pytest-timeout 插件：

```bash
pip install pytest-timeout
pytest --timeout=60
```

#### 3. 监控和清理进程

手动检查并清理僵尸进程：

```bash
# 查找运行中的测试进程
ps aux | grep -E "pytest|go test"

# 强制终止
pkill -9 pytest
pkill -9 "go test"
```

#### 4. 使用 background 模式谨慎

在 Claude Code 中使用 `run_in_background` 时：
- 始终设置合理的 `timeout` 参数
- 使用 `TaskOutput` 定期检查状态
- 完成后确认进程已终止

#### 5. 配置 Claude Code settings

在 `.claude/settings.local.json` 中限制危险命令：

```json
{
  "permissions": {
    "deny": [
      "Bash(pytest *)",
      "Bash(go test *)"
    ],
    "allow": [
      "Bash(timeout * pytest *)",
      "Bash(timeout * go test *)"
    ]
  }
}
```

### 最佳实践

1. **始终使用 timeout** 包装长时间运行的命令
2. **设置合理的超时时间**：单元测试 60s，集成测试 300s
3. **监控资源使用**：定期检查内存和 CPU
4. **使用测试的 -x 参数**：遇到第一个失败即停止（pytest -x, go test -failfast）
5. **限制并发**：pytest -n 4、go test -parallel 4

### 相关命令

```bash
# 查看系统资源使用
htop

# 查看特定用户进程
ps aux | grep $(whoami)

# 终止所有 Python 测试进程
pkill -9 -f pytest
```
