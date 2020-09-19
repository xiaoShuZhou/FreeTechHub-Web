const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins:[new CompressionPlugin({
                   test: productionGzipExtensions,
                   threshold: 10240,
                   deleteOriginalAssets: true
                })]
           }
        }
    }
}