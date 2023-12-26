## laravel connection数组合并函数差别
在Laravel中，Collections是一个强大的工具，它提供了许多操作数组数据的方法。在Collections中，`merge`和`concat`是两个用于合并集合的方法，它们之间存在一些差别。

1. **merge方法：**
   - `merge`方法用于将两个集合合并成一个新的集合。
   - 如果有相同的键，后面的集合的值会覆盖前面的集合的值。
   - 示例：
     ```php
     $collection1 = collect(['a' => 1, 'b' => 2]);
     $collection2 = collect(['b' => 3, 'c' => 4]);
     $result = $collection1->merge($collection2);
     ```
     结果为：
     ```
     Illuminate\Support\Collection Object
     (
         [items:protected] => Array
             (
                 [a] => 1
                 [b] => 3
                 [c] => 4
             )
     )
     ```

2. **concat方法：**
   - `concat`方法也用于将两个集合合并成一个新的集合。
   - 与`merge`不同，`concat`方法不会覆盖相同键的值，而是保留两个集合中相同键的所有值。
   - 示例：
     ```php
     $collection1 = collect(['a' => 1, 'b' => 2]);
     $collection2 = collect(['b' => 3, 'c' => 4]);
     $result = $collection1->concat($collection2);
     ```
     结果为：
     ```
     Illuminate\Support\Collection Object
     (
         [items:protected] => Array
             (
                 [a] => 1
                 [b] => 2
                 [b] => 3
                 [c] => 4
             )
     )
     ```

总结：
- `merge`方法会覆盖相同键的值，只保留后面集合中相同键的值；
- `concat`方法会保留两个集合中相同键的所有值。
