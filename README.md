# js-ast-demo

JS 的 AST demo

要点

- 需要一个解析器，将代码转换为 AST
- 需要一个遍历器，能够遍历 AST,并能够方便的对 AST 节点进行增删改查等操作
- 需要一个代码生成器，能够将 AST 转换为代码

工具

esprima 与 babel

`Estools家族`

```js
const esprima = require('esprima'); // code => ast
const estraverse = require('estraverse'); //ast遍历
const escodegen = require('escodegen'); // ast => code
```

`babel`

```js
const parser = require('@babel/parser'); //code => ast
const traverse = require('@babel/traverse').default; // ast遍历，节点增删改查，作用域处理等
const generate = require('@babel/generator').default; // ast => code
const t = require('@babel/types'); // 用于AST节点的Lodash式工具库,各节点构造、验证等
```

- `@babel/parser`用于将代码转换为 AST
- `@babel/traverse`用于对 AST 的遍历，包括节点增删改查、作用域等处理
- `@babel/generator`用于将 AST 转换成代码
- `@babel/types` 用于 AST 节点操作的 Lodash 式工具库,各节点构造、验证等

更多 api 详见[babel 手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

## 参考链接

- [Javascript 抽象语法树下篇(实践篇)](https://juejin.im/post/5d779f58e51d45620821cf58)
