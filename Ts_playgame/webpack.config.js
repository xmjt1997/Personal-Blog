const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports= {
    mode: "production",
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use:'ts-loader'
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                    "postcss-preset-env",
                                    {
                                        browser:'last 2 versions'
                                    }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ]
}