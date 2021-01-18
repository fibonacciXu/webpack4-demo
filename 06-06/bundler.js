const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

// 单个模块
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

// 依赖图谱 是个对象
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    const { dependencies } = item; // 入口文件的依赖/模块
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]));
      }
    }
  }
  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  return graph;
};

// 生成代码
const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  return `
		(function(graph){
			function require(module) { 
				// 相对路径转化函数
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
};

const code = generateCode("./src/index.js");
console.log(code);
