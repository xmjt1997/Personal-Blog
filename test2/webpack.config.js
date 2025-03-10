const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

process.env.NODE_ENV == "development";
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "",
  },
  module: {
    rules: [
      // {
      //     test:/\.less$/,
      //     use:[
      //         // 'style-loader',
      //         MiniCssExtractPlugin.loader,
      //         'css-loader',
      //         'less-loader'
      //     ],
      // },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      // {
      //   test: /\.js$/,
      //   exclude: "/node_modules",
      //   loader: "eslint-loader",
      //   options: {
      //     fix: true,
      //   },
      // },
      {   
        test:/\.js$/,
        exclude:/node_modules/,
        use:{
            loader:'babel-loader',
        options:{
            presets:[
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns:'usage',
                        corejs:{
                        //core-js的版本
                            version:3
                        },
                        //需要兼容的浏览器
                        targets:{
                            chrome:'60',
                            firefox:'60',
                            ie:'9',
                            safari:'10',
                            edge:'17'
                        }
                    }
                ]
            ]
        }
        }
        
    },
      {
        test: /\.(jpg|png|gif|)$/,
        loader: "url-loader",
        options: {
          limit: 20 * 1024,
          name: "[hash:10].[ext]",
          esModule: false,
          outputPath: "image",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "other",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "webpack",
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new ESLintPlugin({
      fix: true,
    }),
  ],
  // devServer:{
  //     contentBase:resolve(__dirname,'dist'),
  //     compress:true,
  //     prot:3000,
  //     open:true,
  //     hot:true
  // }
};
