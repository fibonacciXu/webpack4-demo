const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("../../04-12/build/node_modules/clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000, // 大于30kb模块才代码分割
      minChunks: 1, // 模块使用1次即进行代码分割
      maxAsyncRequests: 5,
      maxInitialRequests: 3, // 入口文件3个，超过则不进行代码分割
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 值越大 优先级越高
          filename: 'vendors.js',
        },
        default: {
          priority: -20,
          reuseExistingChunk: true, // 不用重复打包模块
          filename: "common.js",
        },
      },
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
};
