# HTML 解析

## 功能梳理

1. 调用方式

- 通过在接收到完整的数据响应之后将 body text 传给解析函数进行解析
- ```js
  const res = await request.send();
  // 这里是将response处理完成的完整数据交给parseHtml去处理的
  // 正常情况中的浏览器是通过分段来处理的,就是解析一段处理一段的形式,这里需要注意
  parse.parseHTML(res);
  ```
