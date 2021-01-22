# LESS

### 注释写法

> ​	用 / / 语法书写的注释，在执行编译后不会出现
>
> ​	用/* */ 语法书写的注释，在执行编译后任然可以看见 

### 变量的使用

> ​	在less中，可以用变量代替任何的东西
>
> - 用变量代替属性值,直接在属性值的位置上用**@+变量名**的方法
>
> `@bgcolor:#000  ` 
>
> body{
>
> ​	background-color:@bgcolor
>
> }
>
> - 变量代替属性和选择器，在属性和选择器的位置上用**@{变量名}**的明发
>
>   `@m:margin`
>
>   `@w:#warp`
>
>   body:{
>
>   ==@{m}==:100
>
>   }
>
>   ==@{w}=={
>
>   Width:100px
>
>   }

### 变量加载具有延迟性

```less
@var:0;
.class{
  @var:1;
  .base{
    @var:2;
    width:@var;
    @var:3;
  }
  one:@var
}
//执行结果
## .class{
  .base{
    width:3
  }
  one:1
}
```

​	**同一个块级作用域下的变量的变量赋值，会等所有变量都加载完毕后选择最终值进行赋值**

### 嵌套规则

> - **父子关系**
>
>   一个层级在另一个层级的内部，满足父子关系 可以使用这种嵌套结构编写，
>
>   父子关系的结构在编译成css后会用空格进行隔开

```less
#body{
  width:100%;
  height:100%;
  .warp{
    width:50px;
    height:100px
  }
}

//编译后的css
#body{
   width:100%;
  height:100%;
}
#body .warp{
  width:50px;
  height:100px
}

//对应html层级结构
<div id=body>
	<div class=warp></div>
</div>
```

> - **同级关系**
>
>   如果是同级关系的话，比如hover，active等方法，用==&==符号进行标注

```less
#body{
  width:100%;
  height:100%;
  .warp{
    width:50px;
    height:100px
    &:hover{
        width:200px;
     }
  }
}

//解析后的css
#body{
   width:100%;
  height:100%;
}
#body .warp{
  width:50px;
  height:100px
}
#body .warp:hover{
  width:200px;
}
```

### 混入Mixin

> ​	普通混合 :混入的对象也会进行编译成css

​	**定义一个父对象作为混入的主体**

```less
.mixin{
  width:100px;
  height:100px;
}
.warp{
  .mixin
}
```

> ​	不带输出的混合：混入的对象不会进行编译 

```less
.mixin(){
  width:100px;
  height:100px;
}
.warp{
  .mixin
}
```

> ​	带参数的混合：混入的对象可以通过传参来定制不同样式

```less
.mixin(@w,@h){
  width:@w;
  height:@y;
}
.warp{
  .mixin(100px,200px)
}
```

> ​	带有默认值参数的混入：混入的对象自带默认参数

```less
.mixin(@w=100px,@h=50px){
  width:@w;
  height:@y;
}
.warp{
  .mixin(100px,200px)
}
.box{
  .mixin()
}
```

> ​	命名参数的混合：可以指定实参给到哪个形参

```less
.mixin(@w=100px,@h=50px){
  width:@w;
  height:@y;
}
.warp{
  .mixin(@h=100px)
}
```

> ​	arguments类型参数混合：当实参和形参数量一致，可以用@arguments一起获取3个参数

```less
.border(@1,@2,@3){
  border:@arguments;
}

.warp{
  .border(2px,solid,black)
}

//编译结果
.warp{
  border:2px solid black；
}
```

### less的运算

​	**less中的计算，只要有一方带单位，计算后的结果就会自动带该单位**

### less继承

​	**继承的性能比混合高，但不支持参数，吧相同的属性使用继承extend引入，差异的属性重新手动定义**

```less
.border{
  border:1px solid black;
}

warp extend(.border){
  width:100px;
}
//编译结果
warp{
  border:1px solid black;
  width:100px;
}
```

