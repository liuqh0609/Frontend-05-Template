# proxy 与双向绑定

## Proxy

> const p = new Proxy(target, handler);

- target ： 要使用 Proxy 包装的对象（可以是任何类型的对象，函数，原生数组，也可以是另一个代理）
- handler ：一个包含了众多属性的对象，这个对象中的属性大部分为函数形式，分别定义了在执行各种操作时代理`p`的行为
  1. `set(target, prop, value)`
     1. 参数一：target 代理的对象
     2. 参数二： prop 设置的对象的属性名
     3. 参数三： value set 的值
  2. `get(target, prop, proxy)`
     1. 参数一：target 代理的对象
     2. 参数二： prop 访问的对象的属性名
     3. 参数三： proxy 代理的新对象（p）
- return：返回值是一个被代理的新对象，需要操作这个对象才可以监听其行为
