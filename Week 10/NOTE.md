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

3. Css 计算

4. Layout

- CSS 中包含着三代的排版技术：

第一代 - 正常流，接近于古典的排版策略：position、display、float 等属性
第二代 - flex，比较接近人的自然思维
第三代 - grid
第四代 - CSS Houdini

- 主轴&交叉轴
  main axis 主轴
  cross axis 交叉轴，与主轴垂直

> flex-direction 决定 main axis 是哪个方向

- 分行

- 根据主轴尺寸，把元素分进行
  若设置了 no-wrap，则强行分配进第一行 当元素所有子元素的尺寸超过父元素的主轴尺寸的时候，就会进行分行。把 flex 容器的子元素 flex item，把它收进各个行里
  计算主轴方向

- 找出所有 flex 元素
  把主轴方向的剩余尺寸按比例分配给这些元素
  若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余元素
  计算交叉轴

- 根据每一行中最大元素尺寸计算行高
  根据行高 flex-align 和 item-align，确定元素具体位置
  绘制单个元素

- 绘制需要依赖一个图形环境
  使用 images 包进行解析
  在 viewport 上进行绘制
  与绘制相关的属性：background-color、border、background-image
  gradient 需要 WebGL 相关的库来处理
  绘制 DOM

- 递归调用子元素的绘制方法完成 DOM 树的绘制
  忽略一些不需要绘制的节点（display：none、head 标签等）

  > 实际浏览器中，文字绘制是难点，需要依赖字体库，把字体变成图片去渲染
  > 实际浏览器中，还会对一些图层做 compositing

  TIP：
  利用语雀记录笔记：
  链接：[笔记链接](https://www.yuque.com/callmew/iu1ugt/csr8da)
