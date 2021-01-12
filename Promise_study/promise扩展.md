# Promise入门到精通(中级篇)-附代码详细讲解

​		**通过上一篇的的介绍，我们应该对Promise的基本用法有了大致的了解，通过构造函数new Promise( )生成一个Promise并使用，在这一章的内容中，我们会介绍几个常用的Promise的原型方法供大家在日常开发中使用，达到事半功倍的效果哦！**

​		介绍==Promise.resolve==方法和==Promise.reject==方法之前我们再来回顾一下Promise完整的创建过程

```javascript
let promise = new Promise((resolve,reject)=>{
          resolve()
          // reject()
      }).then(res=>{

      }).catch(err=>{
        
      })
```

​		这样的写法虽说代码量不多，但每次都要把==resolve==,==reject==参数都写出来也着实麻烦，有没有这样一种情况，某些功能需求只用到了==resolve( )==或者==reject( )==，这时候有一个简洁的写法那就太好了

### Promise.resolve( )

​		Promise.resolve( )，它的基础用法如下

```javascript
let promise = Promise.resolve(//需要转成Promise的对象)
```

​		Promise.resolve( ) 本质上就是Promise的语法糖，它的作用就是可以把现有的对象转换为一个状态为`fulfilled`的Promise对象。它等价于下面的写法

```
let promise = new Promise(resolve=>{
        resolve()
      }).then(res=>{
        
      })
```

​		**Promise.resolve方法传递到对象参数有如下几种情况**

​		**情况1**：`空对象`

> ​	Promise.resolve方法允许不传递任何的参数对象，如果你想直接定义一个Promise对象，就可以直接使用`Promise.resolve`方法而无需通过`new Promise( )`来创建构造函数。

```javascript
let promise = Promise.resolve()
console.log(promise)

//执行结果
### Promise {<fulfilled>:undefined}
```

​		**情况2**：`Promise对象`

> ​	如果Promise.resolve传递的参数就是一个Promise对象，那么Promise.resolve不做任何变化，还是遵守Promise所定义的规则

```javascript
let promise = new Promise((resolve,reject)=>{
      let timer = setTimeout(()=>{
        resolve('promise对象')
        clearTimeout(timer)
      },100)
    })

let promise2 = Promise.resolve(promise).then(res=>{
     console.log(res);
})

//执行结果
### promise对象
```

​		**情况3**：`字符串、数字、布尔、对象、数组等常用变量`

> ​	如果Promise.resolve传入的参数是上述这些常见类型参数（带then方法的对象除外），那么Promise.resolve会重新返回一个Promise对象，状态为`fulfilled`

```javascript
let obj1 = 123
let obj2 = 'promise'
let obj3 = true
let obj4 = {name:'promise'}
let obj5 = [1,2,3]

let promise1 = Promise.resolve(obj1).then(res=>{
    console.log(res);
})
//执行结果
### 123

let promise2 = Promise.resolve(obj2).then(res=>{
    console.log(res);
})
//执行结果
### promise

let promise3 = Promise.resolve(obj3).then(res=>{
    console.log(res);
})
//执行结果
### true

let promise4 = Promise.resolve(obj4).then(res=>{
    console.log(res);
})
//执行结果
### {name:'promise'}

let promise5 = Promise.resolve(obj5).then(res=>{
    console.log(res);
})
//执行结果
### [1,2,3]
```

​		**情况4**：`thenable对象`

> ​	首先说一下什么是thenable对象，简单来说就是一个对象中包含了一个then方法，比如：
>
> ​	let obj = {
>
> ​	then:function(){}
>
> ​	}
>
> ​	这样的一个对象就称为thenable对象，如果Promise.resolve传入的参数是一个这样的对象，那么Promise.resolve方法会把这个对象转换为一个Promise对象，并可以执行then这个方法

```javascript
 let obj={
    	then:function(){
      console.log('我是thenable对象');
    }
  }
 
 let promise2 = Promise.resolve(obj)
 
 //执行结果
 ### 我是thenable对象
```



### Promise.reject

​		Promise.reject( )的基本用法如下

```javascript
let promise = Promise.reject(//需要转成Promise的对象)
```

​		它也是Promise状态reject回调的语法糖，可以把现有的对象转换为一个状态为`reject`的Promise对象。它等价于下面的写法

```javascript
let promise = new Promise((resolve,reject)=>{
       reject()
 }).catch(err=>{
  
})
```

​		Promise.reject方法也可以选择是否传递参数，如果你想直接定义一个状态为`reject`的Promise对象，就可以直接使用`Promise.reject`方法

​		⚠️和`Promise.resolve`方法不同的时候，当`Promise.reject`方法传递参数的时候，无论传递的参数是什么，Promise.reject都不会对其进行特殊处理，传什么就输出什么！

```javascript
let thenable = {
      then:function(resolve, reject) {
        reject("错误了");
      },
    };

Promise.reject(thenable).catch((err) => {
    console.log(err);
  });

//执行结果
### {then:f(resolve, reject)}
```





​		⚠️ 通过Promise.resolve和Promise.reject这种方法生成的Promise也称为立即执行的Promise，在javascript事件循环机制(Event Loop)中处于本轮循环结束时执行，<!--关于JavaScript事件循环机制后面有机会将单独写一篇文章来介绍-->

```javascript
//定时器事件
let timer = setTimeout(()=>{
        console.log('下一轮循环开始执行');
        clearTimeout(timer)
      },0)

//promise.resolve事件
let promise2 = Promise.resolve('本轮循环结束执行').then(res=>{
       console.log(res);
 })

//普通事件
console.log('立即执行');

//执行结果
### 立即执行
### 本轮循环结束执行
### 下一轮循环开始执行
```





### Promise.all

Interable 可迭代对象 array map set

整合接口 。。

### Promise.race

测试接口速度，做超时处理

 function time (t){

​          return new Promise(resolve=>{

​            let timer = setTimeout(()=>{

​                resolve('我是第'+t+'秒')

​            },t)

​          })

​      }

​       

​      Promise.race([

​      time(500),

​      time(2500),

​      time(100)

​      ]).then(res=>{

​        console.log(res);

​      })





