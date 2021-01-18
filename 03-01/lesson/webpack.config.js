const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  module: {
    // loader 从下向上 从右向左的执行顺序
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader", // 打包成base64形式，只限于小文件
          options: {
            // placeholder 占位符
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 10240, // 大于10KB才打包到images文件下
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // css 模块化
              modules: true,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
