const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  resolveLoader: {
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: "replaceLoader",
            options: {
            //   name: "lee",
            },
          },
          {
            loader: "replaceLoaderAsync",
            options: {
              name: "lee",
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
