## 中间分支 Squash Merge 导致后续分支冲突

### 问题背景

当使用 squash merge 将 `branch1` 合并到 `master` 时，如果存在基于 `branch1` 创建的 `branch2`，后续 `branch2` 提交 PR 时会出现以下问题：

1. **大量冲突**：与 master 的 squash merge 提交产生冲突
2. **重复 commit**：包含 `branch1` 的所有原始 commit 记录

### 原因分析

Squash merge 会将多个 commit 压缩为一个新 commit，改变 git 历史结构：
- Master 分支上的 squash commit 是新的 commit hash
- Branch2 仍保留 branch1 的原始 commit 记录
- Git 认为这些是不同的 commit，导致冲突和重复

### 最佳实践

**中间分支避免使用 squash merge**：
- 如果分支会被其他分支继承，使用普通 merge 或 rebase
- 仅在最终特性分支合并时考虑 squash

**开发流程建议**：
- 定期 rebase master 到开发分支，保持同步
- 避免基于中间分支创建长期开发分支

### 解决方案

创建干净分支并 cherry-pick 目标 commit：

```bash
# 从 master 创建新的干净分支
git checkout master
git pull origin master
git checkout -b branch2-clean

# 找到 branch2 相对于 branch1 的 commit 记录
git log branch1..branch2 --oneline

# Cherry-pick 这些 commit 到新分支
git cherry-pick <commit-hash-1> <commit-hash-2> ...

# 推送新分支并创建 PR
git push origin branch2-clean
```

### 替代方案

如果 commit 数量较多，可以使用 rebase：

```bash
# 基于 master 重新创建 branch2
git checkout -b branch2-new master
git rebase --onto master branch1 branch2-new
```