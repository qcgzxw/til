## golang包管理工具无法获取到包最新版本的情况
通常这种情况是本地环境配置了带缓存的GOPROXY，只需要更改GOPROXY即可。
以下示例将原来的`https://proxy.golang.org,direct` 改为 `https://goproxy.io,direct`

1. 查看Golang环境变量 `go env`
2. 设置GOPROXY `go env -w GOPROXY=`
3. 重新安装包

```shell
➜  scripts git:(bug) ✗ go mod tidy                                
go: finding module for package github.com/qcgzxw/graphql-upload
go: found github.com/qcgzxw/graphql-upload in github.com/qcgzxw/graphql-upload v0.0.0-20230512063240-9ceac7c316d2

➜  scripts git:(bug) ✗ go env
...
GOPROXY="https://proxy.golang.org,direct"

➜  scripts git:(bug) ✗ go env -w GOPROXY=https://goproxy.io,direct 
➜  scripts git:(bug) ✗ go get -u github.com/qcgzxw/graphql-upload  
go: downloading github.com/qcgzxw/graphql-upload v0.0.0-20240522040122-5292c25b4418
go: upgraded github.com/qcgzxw/graphql-upload v0.0.0-20230512063240-9ceac7c316d2 => v0.0.0-20240522040122-5292c25b4418
```
