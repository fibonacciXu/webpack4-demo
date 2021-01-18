const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  externals: ["lodash"], // 忽略包打包，业务打包
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    library: "root", // 通过script 标签引入
    libraryTarget: "umd", // 通用引入都可以
  },
};
