# Promise

​			**promise**，中文翻译为`承诺，约定`，从字面意思来看，这应该是类似某种协议的东西，规定了什么事件发生的条件和触发方法。

> ​	什么是`异步？？?`
>
> ​	首先javascript是运行在浏览器端的语言，必须依赖javascript引擎来解析并执行代码，js引擎是`单线程`，也就是一个任务接着一个任务来执行程序，这种单线程很容易因为一个任务发生延迟，造成整体的耗时变长，为了解决这个问题，所以就有了`异步`这个概念。
>
> ​	异步就是当系统执行一个事件的时候，不会等待该事件结束，而是会去继续执行其他事件，当这个异步事件有了响应结果之后，系统会在空闲的时候继续执行该事件。

​		简单来说就是js引擎会首先判断该事件是同步任务还是异步任务，如果是同步任务，将该事件压入宏任务队列中排队等待执行，如果是异步事件，则进入微任务队列中等待宏任务队列处于空闲状态时，再将微任务队列中的事件移入宏任务队列执行。这样我们就可以把不确定执行时间的一些事件用异步来执行。提高了程序运行的效率，而`Promise`就是`ECMAscript ES6`原生的对象，是解决javascript语言异步编程的==一种方法==。



### **Promise的核心概念**

​		Promise中的核心概念是==状态==，==状态转换==就是Promise执行异步事件的`时机`

​		在Promise中有存在3种状态，分别对应的是:

​		1、等待（==padding==）

​		2、承诺实现（==fulfilled==）

​		3、承诺失效（==reject==）

​		Promise初始状态只能为等待的padding状态，在适当的时机，我们可以选择改变padding的状态到fulfilled或者reject。

​		⚠️ Promise中的状态是不可逆转的，且仅允许改变一次,所以无法从fulfilled或reject状态再次切换到其他状态。当初始的padding改变为fulfilled或reject后，该Promise就相当于完成了它的使命，后续的异步处理就会交由一个==then( )==的方法来实现。



### **Promise的基本构成**

​		在ES6语法中，Promise是一个`构造函数`，使用时需要用`new`关键词来创建实例对象。Promise构造函数中自带`excutor`执行器，excutor执行器中有2个JavaScript中默认的函数参数==resolve==，==reject==

​		==resolve==函数的作用是当Promise状态从padding转换到resolve时,可以把Promise中的对象或者变量当成参数传递出来供异步成功时调用，==reject==函数的作用是当Promise状态从padding转换到reject时候可以把Promise中的对象或者变量，以及系统报错当成参数传递出来供异步失败时调用。

​		==then( )==是Promise原型上的一个方法，**`Promise.prototype.then()`** 所以通过构造函数创建的Promise实例对象也会自带then( )方法。then( )方法接受2个函数参数，作为Promise中异步成功和异步失败的2个回调函数。



​		**Promise实例的基本代码结构：**

```javascript
//ES6 箭头函数写法
let promise = new Promise((resolve,reject)=>{
    if(/判断条件/){
        resolve()//承诺实现
    }else{
				reject()//承诺实效
    }
})
promise.then(res=>{
		//处理承诺实现方法
},err=>{
    //处理承诺失效方法     
})
```



❗️❗️❗️注意：Promise函数本身不是一个异步函数，在excutor执行器中运行的代码是同步的。执行异步的是then( )方法中的事件

```javascript
console.log('步骤1');
new Promise((resolve,reject)=>{
    console.log('步骤2');
})
console.log('步骤3')

//执行结果
### 步骤1
### 步骤2
### 步骤3

console.log('步骤1');
new Promise((resolve,reject)=>{
    console.log('步骤2');
    resolve()
}).then(res=>{
    console.log('步骤3');
})
console.log('步骤4')

//执行结果
### 步骤1
### 步骤2
### 步骤4
### 步骤3
```



​		==.catch( )==也是Promise原型上的一个方法，用来接收和处理Promise中的异步失败，乍一看怎么和then( )中第二个函数参数的功能是一样的嘞？没错滴，这2种方法都是用来处理异步失败的回调函数，但它们2个之间还是有一些小小的区别。🌟 then( )中第二个函数参数只能处理当前Promise异步失败的回调，而catch( )可以处理整个`Promise链`上发生的异步失败的回调,便于异步失败和系统报错的整体处理。

```javascript
let promise new Promise ((resolve,reject)=>{
  reject('发生错误了')
})
promise.catch(err=>{
  console.log(err)
})
//执行结果
### 发生错误了

let promise new Promise ((resolve,reject)=>{
  throw ('发生错误了')
})
promise.catch(err=>{
  console.log(err)
})
//执行结果
### 发生错误了
```

⭕️ （**推荐在Promise中使用catch来捕获处理异步失败方法和抛出错误**）

### Promise链式调用

​		链式调用是Promise中一个特别重要的属性。也是Promise能控制异步操作的关键,那么链式调用是什么？它的原理又是什么呢？

​		链式调用最重要的作用就是能使`异步事件同步化`，将多个异步事件变为同步，

```javascript
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },100)
}).then(res=>{
    console.log('我成功了');
})


let promise2 = new Promise((resolve,reject)=>{
    resolve()
}).then(res=>{
    console.log('我也成功了');
})

//执行结果
### 我也成功了
### 我成功了
```

​		**可以看出，这两个方法执行顺序并不按照代码结构上的顺序来执行，也就是所谓的异步事件**，

​		链式调用主要原理就是==Promise.prototype.then==方法和==Promise.prototype.catch==会返回一个新的Prmise对象，所以我们在Prmise后面可以一直使用==then( )==方法来处理异步事件，这样每个异步事件都会等上一个异步事件的then( )方法触发后才会执行自身，从而达到同步的效果.

​		当我们想让2个异步事件也遵循同步来执行就可以用Prmise的链式调用方法来重写代码结构:

```javascript
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },100)
}).then(res=>{
    console.log('我成功了');
    return new Promise((resolve,reject)=>{
        resolve()
    })
}).then((res)=>{
    console.log('我也成功了');
})

//执行结果
### 我成功了
### 我也成功了
```

### Promise链式调用的规则

​		链式调用是Promise中一个重要的方法，能有效处理同步异步之间的逻辑关系，但是链式调用也有着自己一套使用规则，熟悉掌握它的规则才能更好的在开发中灵活的使用

​	**规则1:**Promise对象会默认返回一个新的Promise，当我们不手动进行干预的时候，这个返回的Promise对象状态为==fulfilled==

```javascript
let promise = new Promise((resolve,reject)=>{
    resolve()
}).then(res=>{
    
}).then(res=>{
    console.log('规则1');
})

//上述的原理等价于下面的写法👇🏻

let promise = new Promise((resolve,reject)=>{
    resolve()
}).then(res=>{
    return new Promise((resolve,reject)=>{
        resolve()
    })
}).then(res=>{
    console.log('规则1');
})

//执行结果
### 规则1
```

​	

​		**规则2:**Promise对象返回值类型是非Promise时，会自动转成状态是==fulfilled==的Promise对象，这个返回值会被==then( )==方法中的第一个参数所接收。

```javascript
let promise = new Promise((resolve,reject)=>{
    resolve()
}).then(res=>{
    let str ='规则2'
    return str
}).then(res=>{
    console.log(res)
})

//上述的原理等价于下面的写法👇🏻

let promise = new Promise((resolve,reject)=>{
    resolve()
}).then(res=>{
    let str ='规则2'
    return new Promise((resolve,reject)=>{
        resolve(str)
    })
}).then(res=>{
    console.log(res)
})

//执行结果
### 规则2
```

​	

​		**规则3:**Promise对象可以手动返回一个新的Promise，这个新的Promise的状态类型可以由我们来决定在什么时间转变为==fulfilled==或==reject==，自由度较高，方便我们自由的来控制逻辑如何执行

```javascript
function init (params) {
    let promise = new Promise((resolve,reject)=>{
        let num=params
        resolve(num)
    }).then(res1=>{
        return new Promise((resolve,reject)=>{
           res1>=5?resolve('大于等于5'):reject('小于5')
        })
    }).then(res2=>{
        console.log(res2);
    }).catch(err=>{
        console.log(err);
    })
}

//执行
init(10)
//执行结果
### 大于等于5

//执行
init(1)
//执行结果
###小于5
```



​	**规则4:**Promise的回调函数中如果抛出错误`error`,会返回一个状态为==reject==的Promise对象，将这个错误作为参数传递给下一个Promise链中的`then( )`方法的第二个函数参数或`catch()`方法

```javascript
let promise = new Promise((resolve, reject) => {
    throw new Error('发生错误')
}).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})

//执行结果
### 发生错误
```



​	**规则5:**Promise的值可以发生穿透现象,当中间的`then()`方法没有定义回调参数时,上一个Promise链上的值会作为参数传递到下一个Promise对象的then( )方法的回调方法中,可以发生多层穿透。

```javascript
let promise = new Promise((resolve, reject) => {
    resolve('规则5')
}).then().then().then(res=>{
    console.log(res);
})

//执行结果
### 规则5
```



### Promise解决的实际问题

​		通过上面的介绍，我们大致了解了Promise的用法，但是为什么我们要使用Promise，在什么地方去使用Promise呢？接下来就来告诉你

​		在JavaScript中尤其是Node.js中，很多的Api方法都是异步方法，获取结果后通过回调函数来执行，当多个这样的异步方法嵌套在一起使用的时候就会出现臭名昭著的`回调地狱`，我相信大部分开发者面对一个复杂的回调地狱时都免不了头皮发麻。下面用这段计数器功能的代码简单模拟一下回调地狱的形式

```javascript
let num=0

let callback = function (value,fn) {
    console.log(value);
    fn()
}

callback(num,()=>{
    num++
    callback(num,()=>{
        num++
        callback(num,()=>{
            num++
            callback(num,()=>{
                num++
                callback(num,()=>{
                    console.log('结束');
                })
            })
        })
    })
})

//执行结果
###
0
1
2
3
4
结束
```

​		上面的代码只是简单的在每次回调的时候进行num+1的操作，但整体看上去就让人有点不太舒服了，更不要提在回调中执行其他异步操作，定时器，接口请求等，这种写法的代码层级嵌套太深不说，就代码长度来看也是越来越宽影响阅读体验。

​		接来下我们就用上面学过的Promise方法来简单的改装一下这个计数器代码

```javascript
let num=0
let promise = new Promise((resolve,reject)=>{
    console.log(num);
    resolve(++num)
}).then(res=>{
    console.log(res);
    return ++res
}).then(res=>{
    console.log(res);
    return ++res
}).then(res=>{
    console.log(res);
    return ++res
}).then(res=>{
    console.log(res);
}).then(res=>{
    console.log('结束');
})

//执行结果
###
0
1
2
3
4
结束
```

​		两段代码进行对比，首先在样式上Promise方法书写的代码看起来更具有美感，在结构上Promise的代码比正常回调函数的写法更具结构性，每一个then方法里对应一个回调，这样写出的代码更容易被其他人所读懂。

​		







### 总结:

promise解决的问题