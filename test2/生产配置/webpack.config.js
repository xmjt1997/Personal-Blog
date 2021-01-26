const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//css代码单独生产文件

module.exports={
    // 入口
    entry:'./src/index.js',
    // 出口
    output:{
        path:resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    //loader
    module:{
        rules:[
            //处理CSS
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            //处理less
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    //插件
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        })
    ],
    //打包模式
    mode:'production'

}