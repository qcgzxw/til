## 修改ThunderBird 默认排序
由于ThunderBird默认时间顺序，每次更新、或者窗口重新打开都会导致之前手动调整的排序方式变成默认的时间顺序。

## 修改方法
由于ThunderBird没有开放邮件默认排序修改方式，我们可以通过手动编辑配置来修改。
https://www.reddit.com/r/Thunderbird/comments/15twda6/comment/l0kygnm/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button

### 操作步骤
1. In thunderbird 115, go to the config editor in settings [right at the bottom]https://imgur.com/a/aXsEXBF
2. In the search bar, type in `"mailnews.default"`
3. Set `"mailnews.default_sort_type"` to 18 [by date received]
4. Then go to `"mailnews.default_sort_order"` and make sure that it's set to 2 [descending]
5. This is what it should look like: https://imgur.com/a/UJcLxch

### 数值
sort_type:
```
1 = Ascending
2 = Descending
```

sort_type
```
17 = None
18 = Date
19 = Subject
20 = Author
21 = ID (Order Received)
22 = Thread
23 = Priority
24 = Status
25 = Size
26 = Flagged
27 = Unread
28 = Recipient
29 = Location
30 = Label
31 = Junk Status
32 = Attachments
33 = Account
34 = Custom
35 = Received
```
