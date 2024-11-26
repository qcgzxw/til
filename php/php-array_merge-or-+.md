## php array_merge 和 + 数组运算符区别
`+`: **基于键名** 的合并。如果数组的**键名**相同，则会保留左侧数组（第一个数组）的元素，忽略右侧数组中具有相同键的元素。

`array_merge`: 

array_merge在处理key为int类型的二维数组时，会自动重新索引，因此可能会出现与预期不相符合的结果。

```shell
php > $a=[2=> '', 5=>'asdqw'];
php > var_dump(array_merge([0=>'defasd'], $a));
array(3) {
  [0]=>
  string(6) "defasd"
  [1]=>
  string(5) "sdsad"
  [2]=>
  string(5) "asdqw"
}
php > var_dump([0=>'defasd'] + $a);
array(3) {
  [0]=>
  string(6) "defasd"
  [2]=>
  string(5) "sdsad"
  [5]=>
  string(5) "asdqw"
}
```

[array merge vs +](https://stitcher.io/blog/array-merge-vs+)
