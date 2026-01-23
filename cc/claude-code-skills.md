## Claude Code 推荐安装的 Skills

### 核心概念区分

#### Skills（技能）
- **定义**：封装了特定工作流程和最佳实践的提示词模板
- **作用**：指导 Claude 如何思考和执行特定类型的任务
- **特点**：不扩展能力，只是优化工作方式
- **调用方式**：自动被 Claude 识别并调用，或通过 `/skill-name` 手动触发
- **存储位置**：`~/.claude/skills/`

#### Tools（工具）
- **定义**：内置的工具集合（如 Bash、Read、Write、Edit、Grep、Glob 等）
- **作用**：提供文件操作、命令执行等基础能力
- **特点**：Claude Code 原生支持，开箱即用
- **调用方式**：Claude 根据任务需要自动调用

#### MCP（Model Context Protocol）
- **定义**：扩展 Claude 能力的外部服务协议
- **作用**：集成外部 API、数据库、文档系统等资源
- **特点**：可以访问实时数据、执行特殊操作
- **调用方式**：通过 MCP Server 提供的工具函数调用
- **存储位置**：`~/.claude/mcp_servers.json`

---

### 推荐 Skills

#### Anthropic 官方 Skills
官方维护的高质量 Skills，涵盖文档处理、前端设计、PDF/Excel 操作等。

```bash
https://github.com/anthropics/skills
```

#### Superpowers
1.6万+ Star 的精选 Skill 集合，覆盖从脑暴、需求文档、开发到测试的全流程。

```bash
https://github.com/obra/superpowers
```

#### Planning-with-files
参考 Manus 的 Agent 方法实现的 Skill，适合多步骤任务，也可用来指导其他 Skill 工作。

```bash
https://github.com/OthmanAdi/planning-with-files
```

---

### 推荐 MCP Servers

#### Context7
**实时文档查询 MCP**，可以获取任何编程库的最新文档和代码示例。

**功能**：
- 查询最新版本的库文档
- 获取代码示例和最佳实践
- 支持 Python、JavaScript、Go、Rust 等主流语言

**安装方法**：

1. 安装 Context7 MCP Server：

```bash
npx -y @context7/mcp-server
```

2. 在 `~/.claude/mcp_servers.json` 中添加配置（首次运行 npx 命令会自动配置）：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}
```

**使用方式**：

```
查询某个库的文档：例如 "如何使用 Next.js 的 App Router？"
获取代码示例：例如 "给我看 SQLAlchemy 的连接池配置示例"
```

---

### 安装方法

#### Skills 安装

1. clone 或下载 Skill 仓库
2. 将技能目录复制到 `~/.claude/skills/`
3. 重启 Claude Code

#### MCP Servers 安装

1. 通过 npm/npx 安装 MCP Server
2. 编辑 `~/.claude/mcp_servers.json` 添加配置
3. 重启 Claude Code

**注意**：Skills 和 MCP 会在对话中自动被调用，无需手动触发。
