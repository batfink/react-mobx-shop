/* eslint semi: [ "error", "never" ], indent: [ "error", 4 ] */

const convert = require('koa-connect')
const history = require('connect-history-api-fallback')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: [
        './src/index.js',
    ],
    output: {
        path: `${__dirname}/public`,
        publicPath: '/',
        filename: 'bundle.js',
    },
    serve: {
        add: (app, middleware, options) => {
            app.use(convert(history()))
        },
        port: 8888,
        content: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['react'],
                            ['env', {
                                targets: {
                                    browsers: [
                                        'last 2 versions',
                                        'not ie <= 10',
                                    ],
                                },
                            }],
                        ],
                        plugins: [
                            'transform-decorators-legacy',
                            'transform-class-properties',
                            'transform-object-rest-spread',
                            'react-hot-loader/babel',
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: HtmlWebpackTemplate,
            appMountId: 'root',
        }),
    ],
}
