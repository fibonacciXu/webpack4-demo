const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("../04-04/build/node_modules/clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 10240,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
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
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  // plugins 可以在webpack运行到某个时刻的时候，帮你做一些事情，类似于生命周期函数
  plugins: [
    // 会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中
    new HtmlWebpackPlugin({
      template: "src/index.html",
	}),
	// 打包前删除dist目录下的文件
    new CleanWebpackPlugin(["dist"]),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
