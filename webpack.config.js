const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模板引擎
const CleanWebpackPlugin = require('clean-webpack-plugin');//构建时清理
const ExtractTextPlugin = require("extract-text-webpack-plugin");//分离样式表
const extractCSS = new ExtractTextPlugin(process.env.NODE_ENV === 'production'?'css/[name]-css.[chunkhash].css':'css/[name]-css.css');//导出css
const extractSass = new ExtractTextPlugin(process.env.NODE_ENV === 'production'?'css/[name]-sass.[chunkhash].css':'css/[name]-sass.css');//导出sass
const babili = require('babili-webpack-plugin')//babel压缩

let webpackConfig = module.exports = {
    devtool: process.env.NODE_ENV === 'production'?"cheap-module-source-map":"cheap-module-eval-source-map",
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: process.env.NODE_ENV === 'production'?'js/[name].bundle.[chunkhash].js':'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1','postcss-loader'],
                    publicPath: "../"
                }),
            },
            {
                test: /\.less$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader' , 'less-loader'],
                    publicPath: "../"
                })
            },
            {
                test: /\.scss/i,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader' , 'sass-loader'],
                    publicPath: "../"
                })
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
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel:process.env.NODE_ENV.includes('production')?7:1,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?name=font/[hash:8].[ext]'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                    'markup-inline-loader?strict=[markup-inline]',
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            '^': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        //清理dist
        (process.env.NODE_ENV === 'production')?
            new CleanWebpackPlugin(['dist']):function () {},
        //自动产出html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + "/src/template.html",
            inject: 'body',
            hash: true,
            chunks: ['index'],
        }),
        //丑化JS
        (process.env.NODE_ENV === 'production') ? new babili() : function(){},
        //样式导出配置
        extractCSS,
        extractSass
    ]
};
