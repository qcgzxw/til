## PHP异常执行顺序
try -> 报错 -> catch -> finally
以上都在return之前执行，如果有return，等非return按照以上顺序执行完之后再按照以上顺序执行return代码。即，finally里的return会覆盖try和catch里的return.
