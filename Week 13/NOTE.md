xw# 重学 HTML

HTML 源于 XML 和 SGML(数据描述系统)，是他们的子集

### 实体字符

1. 不建议使用$nbsp;来代替空格，而是使用 CSS 中的 white-space:pre;或者使用<pre>标签来处理空白
2. 其他常用实体符号

```html
$quot; 含义为" $amp; 含义为& $gt; > $lt; <
```

### 语义化标签

#### 常用的语义标签

- header
- main 一般表示页面主体，只有一个
- nav
- article
- aside
- h1,h2,strong
- ol,li
- pre,code
- footer

#### 语义化的意义：

- 便于 SEO
- 代码更有意义，便于理解和维护

### 浏览器 API | DOM API

![node节点分类](./node节点分类.png)

#### 导航类操作

node 类

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

  标签元素类

- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling

#### 修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

#### 高级操作

- compareDocumentPosition 是一个用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用"==="
- cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝

### 事件 API

addEventListener

#### 冒泡和捕获

事件是先捕获，再冒泡

因为浏览器是先触发外层的事件，再根据事件的触发点一层层，计算到的

```html
<div>
  <span></span>
</div>
```

这段代码中，先捕获，顺序是 div>span
再冒泡，顺序是 span>div

### Range API

比节点 API 更细致，比如操作半个节点

```js
var range = new Range(); // 创建Range对象
range.setStart(element, 9); // 设置起始点
range.setEnd(element, 4); // 设置终点
var range = document.getSelection().getRangeAt(0);

// 设置起点在某个节点之前
range.setStartBefore;
// 设置终点在某个节点之前
range.setEndBefore;
// 设置起点在节点之后
range.setStartAfter;
// 设置终点在节点之后
range.setEndAfter;
// Range 的起始和结束节点的父节点与 referenceNode 的父节点相同。
range.selectNode(referenceNode);
// 选中元素的所有内容
range.selectNodeContents;

var fragment = range.extractContents();
range.insertNode(document.createTextNode("aa"));
```

tips:
在操作 DOM 的框架库中，range 和 fragment 通常一起工作，在内存中实现元素的增删改，然后一次性执行 DOM 操作。这样可以减少 DOM 操作，优化性能。

### CSSOM API

`document.styleSheets` 获取 CSS

- Rules
  `document.styleSheets[0].cssRules`
  `document.styleSheets[0].insertRule("p {color:pink;}",0)` 在某个位置插入样式
  `document.styleSheets[0].removeRule(0)` 删除某个位置的样式

- CSSStyleRule

- window.getComputedStyle(el,pseudoEl)
  el 想获取的元素
  pseudoEl 伪元素
  应用：比如动画的中间态，或者伪元素等样式的获取

### CSSOM View

#### window 对象

视窗，浏览器全局对象

比较重要的值
window.innerWidth 视窗宽度
window.innerHeight 视窗高度
window.devicePixelRatio 设备像素比，普通是 1:1，retina 屏有可能 1:2 和 1:3

window.open(url,type)
type：打开方式 \_self 当前页面 \_blank 新页面
还有第三个参数，用于控制新窗口的宽高和位置（通常弹框广告可以这样实现，不推荐）

#### 关于 scroll

scrollTop
scrollLeft
scrollWidth
scrollHeight
scroll(x,y)
scrollBy(x,y)
scrollIntoView() 每个元素都有的方法，滚动到视图可见区域

window.scrollX
window.scrollY
window.scroll(x,y)
window.scrollBy(x,y)

#### 关于 layout

getClientRects() 获取元素占据页面的所有矩形区域
getBoundingClientRects() 返回元素的大小及其相对于视口的位置（使用比例很高）
