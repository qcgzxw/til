## Apollo client query默认策略为 **cache-first**
小程序问题排查，在在执行相同的query请求时，没有网络请求。猜测击中了GraphQL的缓存。
后续部分实时更新的请求通过设置了 **fetchPolicy:no-cache** 解决。

## Apollo client缓存策略
query设置 fetchPolicy 属性指定缓存策略。如不设置，默认为**cache-first**
- cache-first：优先从缓存中获取数据，如果缓存中没有数据，则发起网络请求。
- network-only：始终发起网络请求，不使用缓存。
- cache-only：仅使用缓存中的数据，不发起网络请求。
- no-cache：既不使用缓存，也不存储响应结果。

```js

const link = ApolloLink.from([errorLink, authMiddleware, httpLink]);
const client = new ApolloClient({
  cache: new InMemoryCache(),// 缓存到内存
  link: link,
});

// 默认查询
export const query = (gqlDocumentNode, variables, fetchPolicy='cache-first') => {
  return client
    .query({
      query: gqlDocumentNode,
      variables: variables,
      fetchPolicy: fetchPolicy,
    });
};

// 实时数据查询
export const noCacheQuery = (gqlDocumentNode, variables) => {
  return query(gqlDocumentNode, variables, 'no-cache');
}
```

