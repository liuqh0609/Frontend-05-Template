# HTML 解析

## 功能梳理

1. 调用方式

- 通过在接收到完整的数据响应之后将 body text 传给解析函数进行解析

```js
const res = await request.send();
// 这里是将response处理完成的完整数据交给parseHtml去处理的
// 正常情况中的浏览器是通过分段来处理的,就是解析一段处理一段的形式,这里需要注意
parse.parseHTML(res);
```

2. HTML 解析

- 利用 FSM（有限状态机）去实现解析
- HTML 标准里已经规定了 HTML 的状态，我们只会挑选其中的一部分去实现一个精简的功能

3. FSM 设计

- 处理标签：
  - 开始标签
  - 结束标签
  - 自闭和标签
- 在这一步忽略属性的计算，只负责处理标签

TIP：
利用语雀记录笔记：
链接：[笔记链接](https://www.yuque.com/callmew/iu1ugt/csr8da)
