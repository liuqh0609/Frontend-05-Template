# 第三周学习笔记

> 我们的代码在计算机的分析过程：
>
> ```mermaid
> graph LR;
>    1.词法分析 --> 2.语法分析 --> 3.解析;
> ```
>
> 第 2 步中的语法分析又是一个构建语法树的过程，最著名的语法分析算法的核心思想有两种：
>
> - LL 算法：[编译原理 LL(1)详解](https://www.cnblogs.com/yuanting0505/p/3761411.html)
> - LR 算法：[语法分析算法 LR(1)基础教程](https://blog.csdn.net/u014287775/article/details/56014810)

## LL 算法

从左向右扫描输入，然后产生最左推导(就是每次都把最左边的非终结字符用产生式代替)。

### 四则运算

- TokenNumber： 0~9、**.** (允许小数点的组合)
- Operator: + - \* /
- Whitespace: `<SP>`
- LineTerminator: `<LF>`、`<CR>`
