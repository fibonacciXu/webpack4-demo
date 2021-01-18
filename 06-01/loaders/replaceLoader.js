const loaderUtils = require("loader-utils");

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  // return source.replace("lee", options.name);
  // 等价于
  const result = source.replace("lee", options.name);
  this.callback(null, result);

  return source.replace("lee", "world");
};
