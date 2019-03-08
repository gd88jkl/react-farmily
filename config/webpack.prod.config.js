const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Copy = require('copy-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
    mode: 'production',
    plugins: [
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            template: resolve('../public/index.html'),
            mapConfig: 'bundle.js'
        }),
        /* webpack自带压缩代码*/
        // new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        /* 多核压缩代码 */
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        // new Copy([
        //     { from: './public/images', to: './images' },
        // ]),
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '../'),
            verbose: false,
        }),
    ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)