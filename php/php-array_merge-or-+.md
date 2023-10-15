## php array_merge 和 + 数组运算符区别
array_merge在处理key为int类型的二维数组时，可能会出现与预期不相符合的结果。
用+代替arary_merge。

```shell
php > $a=[2=> 'sdsad', 5=>'asdqw'];
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
