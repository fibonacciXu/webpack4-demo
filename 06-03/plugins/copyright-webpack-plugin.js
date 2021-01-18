class CopyrightWebpackPlugin {
  // compiler 为webpack 实例
  apply(compiler) {
    // 同步时刻
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", (compilation) => {
      console.log("compiler");
    });

	// 异步时刻
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        debugger;
        compilation.assets["copyright.txt"] = {
          source: function () {
            return "copyright by dell lee";
          },
          // 文件大小21个字节
          size: function () {
            return 21;
          },
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
