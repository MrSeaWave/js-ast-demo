let fs = require('fs');
const esprima = require('esprima'); //将JS代码转化为语法树模块
const estraverse = require('estraverse'); //JS语法树遍历各节点
const escodegen = require('escodegen'); //将JS语法树反编译成js代码模块

/*
由源代码得到抽象语法树
*/
function getAst(jsFile) {
  let jsCode;
  return new Promise((resolve) => {
    fs.readFile(jsFile, (error, data) => {
      jsCode = data.toString();
      resolve(esprima.parseScript(jsCode));
    });
  });
}

/*
设置全等
*/
function setEqual(node) {
  if (node.operator === '==') {
    node.operator = '===';
  }
}

/*
删除console
*/
function delConsole(node) {
  if (
    node.type === 'ExpressionStatement' &&
    node.expression.type === 'CallExpression' &&
    node.expression.callee.object.name === 'console'
  ) {
    node.expression.callee.object.name = '//console';
  }
}

/*
把var变成let
*/
function setLet(node) {
  if (node.kind === 'var') {
    node.kind = 'let';
  }
}

/*
遍历语法树
*/
function travel(ast) {
  estraverse.traverse(ast, {
    enter: (node) => {
      setEqual(node);
      setLet(node);
      delConsole(node);
    },
  });
}

/*
生成文件
*/
function writeCode(file, data) {
  fs.writeFile(file, data, (error) => {
    console.log(error);
  });
}

/*
 入口函数
*/
function main() {
  let file = './originCode.js';
  let distFile = './distCode.js';
  getAst(file).then(function (jsCode) {
    travel(jsCode);

    // 删掉 console ， 通过parseScript在生成一变ast去掉注释的内容
    // let distCode = escodegen.generate( esprima.parseScript( escodegen.generate(jsCode)));
    // 注释 console
    let distCode = escodegen.generate(jsCode);
    console.log('distcode', distCode);

    writeCode(distFile, distCode);
  });
}

main();
