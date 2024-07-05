## 删除git提交历史
为了清除不小心提交的敏感信息，可以创建一个新的分支push到master覆盖。

```bash
# 创建并切换到最新分支 orphan不保留git log记录
git checkout --orphan latest_branch 

# 添加所有文件并commit
git commit -am "initial"

# 删除master分支
git branch -D master

# 分支重命名
git branch -m master

# 强制提交
git push -f origin master

```

## GitHub请求删除PR等信息

提交工单到GitHub 人工删除
[Remove data from a repository I own or control](https://support.github.com/request/remove-data)


