const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');//构建时清理
const autoprefixer = require('autoprefixer');//补全css各种hack

module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        plugin: './src/js/plugin.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader','postcss-loader']
            },
            {
                test: /\.scss/i,
                use: ['style-loader','css-loader','postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "env",
                            "stage-3"
                        ]
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?name=font/[hash:8].[ext]'
                ]
            }
        ]
    },
    plugins: [
        //清理lib
        new CleanWebpackPlugin(['lib']),
    ]
};
