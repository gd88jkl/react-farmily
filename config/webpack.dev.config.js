const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 2000

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
  
const webpackConfigDev = {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('../public/index.html')
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}`,
        }),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: resolve('../src'),
        historyApiFallback: true,
        hot: false,
        host: '0.0.0.0',
        port: PORT,
        disableHostCheck: true,
        proxy: {
            '/mock/api/**': {
                target: 'https://easy-mock.com/mock/5c3ee8feca1bbf541c89e9af/api/',
                pathRewrite: {'^/mock/api/': ''},
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            },
            '/api/**': {
                target: 'http://127.0.0.1:1234',
                pathRewrite: {'^/api/': ''},
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            }
        }
    },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)