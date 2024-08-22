## 使用GitLab官方API创建脚本一键提交MR
- [Merge requests API](https://docs.gitlab.com/ee/api/merge_requests.html)
- [Create MR](https://docs.gitlab.com/ee/api/merge_requests.html#create-mr)

### API说明
根据官方API，找到关键参数

| 参数                    | 类型                  | 是否必需 | 描述 |
|-------------------------|-----------------------|----------|------|
| `id`                    | integer or string     | Yes      | 项目的 ID 或 URL 编码的路径，必须为当前认证用户拥有的项目。 |
| `source_branch`         | string                | Yes      | 源分支的名称。 |
| `target_branch`         | string                | Yes      | 目标分支的名称。 |
| `title`                 | string                | Yes      | MR 的标题。 |
| `description`           | string                | No       | MR 的描述。限制为 1,048,576 个字符。 |
| `remove_source_branch`  | boolean               | No       | 指示在合并时是否删除源分支。 |
| `target_project_id`     | integer               | No       | 目标项目的数字 ID。 |

### 编写脚本如下：
基本实现功能为：
1. 自动提交当前分支
2. title 为今日日期
3. description 为 git log
4. 合并后自动删除源分支（未配置变量，硬编码）

[push_and_create_pr.sh](https://gist.github.com/qcgzxw/eec82e2a1647bbe3d0444e046d4a4ade)


```bash
#!/bin/bash

# 配置变量
GITLAB_URL="https://gitlab.com"
GITLAB_PRIVATE_TOKEN=""  # 替换为你的 GitLab Personal Access Token
TARGET_PROJECT_ID=""  # 目标项目ID
SOURCE_PROJECT_ID=""  # 源项目ID
SOURCE_ORIGIN="origin" # 源origin名称
TARGET_ORIGIN="upstream" # 目标origin名称
TARGET_BRANCH="develop"  # 目标分支

# 获取当前分支名称
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 获取当前日期作为 PR 标题
PR_TITLE=$(date +"%Y/%m/%d")

# 获取最新分支，避免git log信息过时
git fetch "$TARGET_ORIGIN" "$TARGET_BRANCH"

# 获取当前分支上所有未合并到目标分支的 commit 日志，去除ID，只保留消息
PR_DESCRIPTION=$(git log $TARGET_ORIGIN/$TARGET_BRANCH..$CURRENT_BRANCH --pretty=format:"- %s")

# 推送当前分支到远程仓库（静默推送，除非出错）
git push "$SOURCE_ORIGIN" "$CURRENT_BRANCH" > /dev/null 2>&1


# 使用 GitLab API 创建 Merge Request 并检查请求结果
response=$(curl --silent --write-out "HTTPSTATUS:%{http_code}" --header "PRIVATE-TOKEN: $GITLAB_PRIVATE_TOKEN" \
  --data "source_branch=$CURRENT_BRANCH&source_project_id=$SOURCE_PROJECT_ID&target_project_id=$TARGET_PROJECT_ID&target_branch=$TARGET_BRANCH&title=$PR_TITLE&description=$PR_DESCRIPTION&remove_source_branch=true" \
  "$GITLAB_URL/api/v4/projects/$SOURCE_PROJECT_ID/merge_requests")

# 分离响应体和状态码
http_body=$(echo "$response" | sed -e 's/HTTPSTATUS\:.*//g')
http_status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

# ANSI 颜色代码
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # 无颜色

# 检查 HTTP 状态码是否为 2xx
if [ "$http_status" -ge 200 ] && [ "$http_status" -lt 300 ]; then
  # 使用 jq 解析 Merge Request 的 URL 并展示
  merge_request_url=$(echo "$http_body" | jq -r '.web_url')
  echo -e "${GREEN}Merge Request created successfully from branch $CURRENT_BRANCH to $TARGET_BRANCH.${NC}"
  echo -e "Merge Request URL: $merge_request_url"
else
  # 使用 jq 提取错误信息
    error_message=$(echo "$http_body" | jq -r '.message // empty')
    echo -e "${RED}Failed to create Merge Request. HTTP Status: $http_status${NC}"
    echo -e "${RED}Error: $error_message${NC}"
fi

```
