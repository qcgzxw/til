## PHP单引号与双引号区别
1. 对变量的解析不同
PHP 会解析双引号中的变量，而不会解析单引号中的变量。也就是说，如果使用单引号定义的字符串中出现变量，在输出时变量会被原样输出，不会解析成变量的值。而如果使用双引号定义的字符串中存在变量，在输出时变量会被解析为具体的值。
2. 转义的字符不同
单引号和双引号中都可以使用转义字符\，但是，在单引号定义的字符串中只能转义单引号和转义符本身，而在双引号定义的字符串中，PHP 可以转义更多的特殊字符。
3. 解析速度不同
因为单引号不需要考虑变量的解析，所以处理速度比双引号要快，我们在定义字符串时应该尽量遵循能用单引号尽量用单引号的原则。

### 双引号能解释变量
```shell
php > $testStr="hello world";
php > echo($testStr);
hello world
php > echo('$testStr');
$testStr
php > echo("$testStr");
hello world
```

## 单双引号导致的问题
在使用json_encode时，字符串中的 **\n** 一直被转义为 **\\n** 。

刚开始一直在验证json_encode flag参数的问题，无果。
后发现是单双引号的问题。
```shell
php > echo(json_encode(["data" => "Hello World!"]));
{"data":"Hello World!"}
php > echo(json_encode(["data" => "Hello \r\nWorld!"]));
{"data":"Hello \r\nWorld!"}
php > echo(json_encode(["data" => 'Hello \r\nWorld!']));
{"data":"Hello \\r\\nWorld!"}

```

