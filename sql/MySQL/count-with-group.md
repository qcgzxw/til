## 使用count计算分组数量
```sql
SELECT tag AS Category, YEAR(created) AS Year,
   COUNT(*) AS Counts FROM fyi_links GROUP BY tag,
   YEAR(created);
```
这里的count统计的是每一组的数量，如果要统计分组数量需要用到子查询
```sql
SELECT COUNT(*) FROM (
   SELECT tag AS Category, YEAR(created) AS Year,
   COUNT(*) AS Counts FROM fyi_links GROUP BY tag,
   YEAR(created) ) groups;
```
