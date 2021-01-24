const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const includeHtml = require('./webpack.include-html-loader.js');
function scanObject() {
    let dirsName = fs.readdirSync(path.resolve('pages'));
    // 入口路径
    let dirsPath = {};
    // 模板生成实例
    let htmlWebpackPluginInstance = [];
    dirsName.forEach((dir) => {
        if (dir === '.DS_Store') return;

        // script
        dirsPath[dir] = path.resolve('pages', dir, 'index.js');
        // html
        let htmlWebpackPluginHash = {
            template: path.join('pages', dir, 'index.html'),
            filename: path.join(dir + '.html'),
            chunks: [dir]
        };
        console.log('htmlWebpackPluginHash', htmlWebpackPluginHash);
        htmlWebpackPluginInstance.push(new HtmlWebpackPlugin(htmlWebpackPluginHash));
    });
    return {
        dirsPath,
        htmlWebpackPluginInstance
    };
}
const scanConfig = scanObject();
module.exports = {
    mode: process.env.NODE_ENV,
    entry: scanConfig.dirsPath,
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js'
    },
    stats: 'errors-warnings',
    cache: true,
    performance: {
        maxEntrypointSize: 1024 * 1024,
        maxAssetSize: 1024 * 1024
    },
    resolve: {
        alias: {
            '@': path.resolve('./')
        }
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname)
        ]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            esModule: false,
                            attributes: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'srcset',
                                        type: 'srcset'
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-src',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'data-srcset',
                                        type: 'srcset'
                                    },
                                    {
                                        tag: 'video',
                                        attribute: 'src',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'video',
                                        attribute: 'srcset',
                                        type: 'srcset'
                                    },
                                    {
                                        tag: 'video',
                                        attribute: 'poster',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'video',
                                        attribute: 'poster',
                                        type: 'srcset'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        loader: 'webpack.include-html-loader.js'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2,
                            url: true,
                            import: true,
                            modules: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                //
                                require('autoprefixer')()
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                    // {
                    //     loader: 'sass-resources-loader',
                    //     options: {
                    //         resources:  '/variable.scss'
                    //     }
                    // }
                ],
                exclude: /node_modules/,
                sideEffects: true
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    // useBuiltIns: "entry",
                                    useBuiltIns: 'usage',
                                    corejs: '3.0.0'
                                }
                            ]
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    absoluteRuntime: false,
                                    corejs: 3,
                                    helpers: true,
                                    regenerator: true,
                                    useESModules: false
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        ...scanConfig.htmlWebpackPluginInstance,
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve('static'),
                    to: path.resolve('dist', 'static'),
                    cacheTransform: true
                }
            ]
        }),
        new ProgressBarPlugin({})
    ]
};
