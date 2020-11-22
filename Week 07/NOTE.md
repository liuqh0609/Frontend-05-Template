# JS表达式和运算符

## Expressions（优先级）

1. Memeber
    - a.b
    - a[b]
    - foo`string` (函数名带上字符串的这种写法，就相当于是给函数传参)
    - super.b
    - super['b']
    - new.target
    - new Foo()
    > Example:
    >  - new a()()    因为new a（）优先级最高，所以该表达式相当于 ==》 ( new a() )()
    >  - new new a()  因为new a()优先级最该，所以该语句相当于 ===》   new （ new a（））
2. New（优先级次之）
    - new Foo

3. Call
    - foo()
    - super()
    - foo()['b']
    - foo().b
    - foo()`abc`
    > Example: 
    > - new a()['b'], 因为Member表达式优先级最高，所以优先执行new a()生成一个a对象，然后再去取该对象的b属性。
    > - 而不是先执行Call表达式的 a()['b']



### Left hand side & Right hand side

> Example:
> - a.b = c 【✔️】
> - a+b = c 【x】
> - 因为a.b是一个left hand side，所以可以出现在等号左边，而a+b是一个right hand side，是不能出现在等号左边的

1. Update（right hand side）
    - a ++
    - a --
    - -- a
    - ++ a

2. Unary(单目运算符)
    - delete a.b
    - void f00()
    - typeof a
    - + a
    - - a
    - ~ a
    - ! a
    - await a

3. Exponental（指数符）
    - **
    > 大部分运算符都是左结合的，只有这个**是右结合的
    > - 3 ** 2 ** 3  ===> 3**（2**3）



### Type Convertion

#### Unboxing（拆箱）
 - 当Object进行类型转换的时候，会优先调用[symbol.toPrimitive]（）
 - 当Object遇到+号并且没有toPrimitive的时候会优先调用`valueOf`方法(转换Number 就调用valueOf)
 - 当Object作为key属性存在时会优先调用`toString`方法（转化string 就调用toString）

#### Boxing（装箱装换）
 - 如果我们使用Member表达式，点之前的变量或者表达式是一个基础类型，那么就会自动去进行装箱操作

### Reference

`a.b` 访问了一个属性，但是他从属性中取出来的不是属性的值，它取出来的是一个引用（Reference）类型
- 引用类型不是JavaScript标准中的类型
- 它是存在于运行时中的一个JavaScript类型，这样的我们把它称作标准中的类型，而不是语言中的类型

一个引用类型分为两个部分：
1. Object：JavaScript对象
2. Key：string、symbol
> 一个Reference类型取出来的是一个Object和一个key，所以说它完全记录了Member运算的前半部分和后半部分

> `a.b`,前半部分a是一个对象，后半部分b是一个key（对象的属性值）

#### Delete & assign （删除和赋值）

delete：`delete a.b`,这时候就需要用到Reference类型，因为我们需要知道删除的是哪一个对象的哪一个属性
assign：`a.b = 10`,这时候也会用到Reference类型，赋值的时候同样也需要知道是给哪个对象的哪个属性进行赋值
这是引用类型的一个关键特征，JavaScript在运行时就是通过Reference类型来处理删除和赋值这样的操作的



# Statement

## Runtime（运行时）

### Completion Record（存储语句执行完成的结果）
- [[type]]: normal, break, continue, return, throw
- [[value]]: 基本类型
- [[target]]: label

## Grammar

### 简单语句
- ExpressionStatement：表达式语句
- EmptyStatement：空语句
- DbuggerStatement：debugger语句
- ThrowStataement： throw抛出错误的语句
- ContinueStatement：continue语句
- BreakStatement：break语句
- ReturnStatement： return语句

### 复合语句
- BlockStatement：一个花括号中间一个语句的列表，能够把我们所需要单条语句的地方都变成，可以用多条语句
    ```js
        {
            xxxxx
            xxxxx
        }
    ```
    > Completion Record
    > - [[type]]:normal
    > - [[value]]:  不确定
    > - [[target]]: 不确定

- IfStatement
- SwitchStatement
- IterationStatement：for、do-while、while等循环语句
- WithSatement
- LabelledStatement：标签语句，可以在简单或者复合语句前面加一个label，相当于取了一个名字，常与IterationStatement结合使用
- TryStatement：try不能省略花括号
    ```js
        try{
            xxxxx
            xxxxx
        }cacth{
            xxxx
        }finally {
            xxxx
        }
    ```
    > Completion Record
    > - [[type]]:return
    > - [[value]]:  不确定
    > - [[target]]: label

# JS结构化

## JS执行粒度（运行时）

- 宏任务
- 微任务（Promise）
- 函数调用