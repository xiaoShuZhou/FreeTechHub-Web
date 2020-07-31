const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/img")) 
      .end()
    config.module
      .rule("icons")
      .test(/.svg$/)
      .include.add(resolve("src/assets/img")) 
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
  }
}
