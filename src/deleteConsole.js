const esprima = require('esprima'); //解析js的语法的包
const estraverse = require('estraverse'); //遍历树的包
const escodegen = require('escodegen'); //生成新的树的包

let code = `
function deleteConsole(){
  console.log('delete console')
}
`;
//解析js的语法
let tree = esprima.parseScript(code);
//遍历树
estraverse.traverse(tree, {
  enter(node) {
    console.log('enter: ' + node.type);
    if (
      node.type === 'ExpressionStatement' &&
      node.expression.type === 'CallExpression' &&
      node.expression.callee.object.name === 'console'
    ) {
      node.expression.callee.object.name = '//console';
    }
  },
});
//生成新的树,这里会带注释
let result = escodegen.generate(tree);
//  通过parseScript在生成一变ast去掉注释的内容
let resultCode = esprima.parseScript(result);
let last = escodegen.generate(resultCode);

console.log(result);
console.log(last);
