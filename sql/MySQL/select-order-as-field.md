## 在MySQL里，使用变量来将序号作为field输出
定义初始值为0的变量，在select里设置自增结果为某一字段，来实现序号。

例如：**`(@row_number := @row_number + 1) AS `index`**

### 示例：
```sql
SET @row_number = 0;

SELECT book.*, @row_number := @row_number + 1 AS `index`
FROM book
WHERE book.author = '莫言';
```
### 结果：
| id | title      | description | author | create_at           | update_at           | index |
|----|------------|-------------|--------|---------------------|---------------------|-------|
| 1  | 大浮沉     | 描述4       | 莫言   | 2024-03-15 09:13:45 | 2024-03-15 09:13:45 | 1     |
| 2  | 蛙         | 描述5       | 莫言   | 2024-03-15 09:13:45 | 2024-03-15 09:13:45 | 2     |
| 3  | 檀香刑     | 描述6       | 莫言   | 2024-03-15 09:13:45 | 2024-03-15 09:13:45 | 3     |

### 注意：order by 顺序导致
select在sql语句里的顺序优于`order by`，如果直接在SQL末尾加上order by来实现排序，生成的序号与预期不符合。
例如：
```sql
SET
    @row_number = 0;
SELECT
    book.*,
    (@row_number := @row_number + 1) AS `index`
FROM
    book
WHERE
    book.author = "莫言"
ORDER BY
    id desc;
```
| id | title      | description | author | create_at           | update_at           | index |
|----|------------|-------------|--------|---------------------|---------------------|-------|
| 3  | 大浮沉     | 描述4       | 莫言   | 2024-03-15 09:13:45 | 2024-03-15 09:13:45 | 3     |
| 2  | 蛙         | 描述5       | 莫言   | 2024-03-15 09:13:45 | 2024-03-15 09:13:45 | 2     |
| 1  | 檀香刑     | 描述6       | 莫言   | 2024-03-15 09:13:45 | 2024-03-15 09:13:45 | 1     |

### ~~解决方法：使用子查询，将查询结果先order by再加序号~~
```sql
SET @row_number = 0;

SELECT a.*, @row_number := @row_number + 1 AS `index`
FROM (
	SELECT *
	FROM book
	WHERE book.author = '莫言'
	ORDER BY id desc
) a
```
## 问题：不同版本MySQL对select order by的支持模糊，不要在子查询使用order by
> 高版本的MySQL（5.6以上）在子查询中使用order by 语句后查询结果并不会显示排序后的结果。
子查询大多数是作为一个结果给主查询使用，所以子查询不需要排序，当子查询中有order by语句时，数据库会自动优化，即忽略order by语句。
参考：https://www.jianshu.com/p/48452a136875
结论：在SQL标准中，子查询中的order by是不生效的
MySQL 5.7由于在这个点上遵循了SQL标准导致问题暴露，而在MySQL 5.6/8.0中这种写法依然是生效的

[MySQL子查询问题](https://blog.csdn.net/weixin_44457814/article/details/101450044)

