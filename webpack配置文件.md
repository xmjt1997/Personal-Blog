# webpack配置文件

### 1、打包模式-mode

> ​	打包模式分为两种，一个是开发模式，一个是生产模式，开发模式下，只需要让程序能运行起来，配置一些自动化工具方便调适即可，生产模式下需要考虑的更多，需要对代码进行压缩，尽可能的做性能优化。

```json
	mode='development',  // 开发模式

	mode='production',	 // 生产模式
```

### 2、入口-entry

> ​	指定一个js文件作为资源引入的入口文件，用来构建打包关系谱

```json
	enrty:'./src/index.js'
```

### 3、出口-output

> ​	指定资源打包后存放的地址

```json
	output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/bundle.js',
    publicPath:''
  }
```

### 4、解析器-loader

> ​	webpack只能识别js文件，如果需要打css，less，sass，图片，ts等类型文件，需要使用对应的loader进行解析后才能正常打包，一般都需要对loader的使用规则进行配置

```json
	module={
    rules=[
    	//解析css文件
			{
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    	//解析less文件
    	{
    		test:/\.less$/,
    		use:['style-loader','css-loader','less-loader']
  		}，
			//解析css中引入图片类型文件
			{
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{//特殊配置
          limit:8*1024, //如果图片大小超过限制，用base64来解析图片
          name:'[hash:10].[ext]', //对图片名称进行简单命名
          esModule:false, //关闭默认的模块引入模式ES6，改用CommenJS模式
          outputPath:'images' //把图片打包资源单独放置一个文件夹里
        }
      },
			//解析html页面通过src引入的图片资源
			{
        test:/\.html$/,
        loader:'html-loader' //需要在url-loader配置中关闭ES6模块的引入，在出口中定义publicPath
      },
			//其他资源打包
			{
        exclude:/\.(html|js|css|less|jpg|png|gif)$/, //排除这些类型文件之外的打包资源（字体，音频）
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'other'
        }
      }
    ]
  }
```

**注意事项：**在loader的配置中，分为简单配置和复杂配置，如果只使用一个loader就可以完成解析就可以用简单配置来书写，loader:'解析器名称'，如果需要多个loader共同来解析，遵守从下往上执行，从右往左折行的原则。

### 5、插件-plugins

>  当我们在开发环境中，需要一些自动化工具来帮助我们更高效的完成开发工作，就可以在plugins中配置一些常用的插件。

```json
	const HtmlWebpackPlugin = require('html-webpack-plugin')
	const {CleanWebpackPlugin} = require('clean-webpack-plugin')

	plugins:[
    new HtmlWebpackPlugin({ //打包后生成一个html文件，自动引入打包资源
      template:'./src/index.html',//指定html模板
      title:'标题' //html网页标题
    }),
    new CleanWebpackPlugin()//每次打包前会删除之前的资源文件
  ]
```



​	⭕️**上述的配置满足一般的开发模式，但是针对生产模式需要进一步的配置，让代码运行更快更平稳。**

​		**生产和开发的区别：**

> ​	1、将打包的css从js文件中提取出来
>
> ​	2、代码进行压缩
>
> ​	3、css样式进行兼容，js语法兼容



### CSS资源单独提取

> ​	把css、less样式代码从js文件中分离出来形成专门的css文件，通过link标签进行引入，解决闪屏问题

```json
	// 安装 mini-css-exract-plugin插件
	const MiniCssExractPlugin = require('mini-css-exract-plugin')
	
	⚠️⚠️⚠️ //用MiniCssExractPlugin.loader 取代style-loader 因为生成了css文件，所以不需要从js中解析css通过style标签来实现样式，而是通过link来引入css文件来实现样式
	
	module={
    rules:[
      {
        test:/\.css/,
        use:[
          MiniCssExractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test:/\.less/,
        use:[
          MiniCssExractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ],
    plugins=[
    	//插件配置
    	new MiniCssExractPlugin({
    		filename:'css/main.css' //css生成文件地址
  		})
    ]
  }
```

### CSS兼容性处理

（版本问题）



### 压缩CSS

> ​	把打包后的css代码进行压缩处理，可以减小代码的体积大小，加载更快

```json
 const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
 
	plugins:[
		new OptimizeCssAssetsWebpackPlugin()
	]
```



### JS语法检查

> ​	统一开发人员对代码风格的编写，方便后期的维护

```json

//引入eslint的规则插件 
 eslint  eslint-loader eslint-config-airbnb-base eslint-plugin-import 
 
	//旧版
 {
 		test:/\.js$/,
   	exclude:'/node_modules',
   	loader:'eslint-loader',
   	options:{
      fix:true //自动修复代码规则
    }
 }

	//新版
	const EslintWebpackPlugin = require('eslint-webpack-plugin')
	plugins:[
    	new EslintWebpackPlugin({
    		fix:true
  		})
  ]
	
//继承airbnb格式规则
package.json 
	"eslintConfig":{
    "extends":"airbnb-base"
  }
```

### JS语法兼容性

> ​	如果需要兼容IE等多版本浏览器，需要对js代码做兼容性处理，把ES6以上的高级语法转为低版本能识别的ES5之前语法。

```json
	//基本兼容性处理
		npm i babel-loader  @/babel/preset-env -D

			{
        test:/\.js$/,
        exclude:'/node_modules',
        loader:'babel-loader',
        options:{
          presets:['@babel/preset-env']
        }
      },
	##问题：只能处理一些基本的兼容性，对promise等语法无法做到兼容处理

	//全部兼容性处理
		npm i @babel/polyfill    
	##需要把@babel/polyfill 添加到项目依赖中，而不是开发依赖中
		在index.js中 通过import '@/babel/polyfill' 引入
	##问题：会导入全部的兼容处理，导致打包后的js文件体积过大

	//按需兼容导入
	npm i core-js 
	
	{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: {
                    //core-js的版本
                    version: 3,
                  },
                  //需要兼容的浏览器
                  targets: {
                    chrome: "60",
                    firefox: "60",
                    ie: "9",
                    safari: "10",
                    edge: "17",
                  },
                },
              ],
            ],
          },
        },
      },
	
```



### HTML、JS代码压缩

> JS代码的压缩，只需要把webpack的打包模式mode设置为==production==，会自动压缩JS代码

```json
//HTML代码的压缩，在html-webpack-plugin插件中通过配置来实现
		new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "webpack",
      minify:{
        collapseWhitespace:true, //删除空格
				removeComments:true	//删除注释        
      }
    }),
```





⚠️⚠️⚠️注意：正常来说，一个类型的文件只能被一个loader来解析，但js文件需要被eslint-loader，和babel-loader分别解析，所以会产生一定的问题，使用一个配置属性来解决。

```json
			{
        test: /\.js$/,
        exclude: "/node_modules",
        loader: "eslint-loader",
        enforce:'pre', //优先执行顺序
        options: {
          fix: true,
        },
      },
```

