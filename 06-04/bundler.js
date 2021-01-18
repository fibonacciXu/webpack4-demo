const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  // 抽象语法树 将js 代码转换为js 语法树
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  const dependencies = {};

  // 获取入口文件的依赖文件的映射关系
  traverse(ast, {
    ImportDeclaration({ node }) {
      // 要拿绝对路径
      const dirname = path.dirname(filename);
      const newFile = "./" + path.join(dirname, node.source.value);
      dependencies[node.source.value] = newFile;
    },
  });
  // 代码转换为浏览器识别代码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  return {
    filename,
    dependencies,
    code,
  };
};

const moduleInfo = moduleAnalyser("./src/index.js");
console.log(moduleInfo);
