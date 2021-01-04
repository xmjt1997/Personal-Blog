# Promise

​		**promise**，中文翻译为`承诺，约定`，从字面意思来看，这应该是类似某种协议的东西，规定了什么事件发生的条件和触发方法。

> ​	什么是`异步？？?`
>
> ​	首先javascript是运行在浏览器端的语言，必须依赖javascript引擎来解析并执行代码，js引擎是`单线程`，也就是一个任务接着一个任务来执行程序，这种单线程很容易因为一个任务发生延迟，造成整体的耗时变长，为了解决这个问题，所以就有了`异步`这个概念。
>
> ​	异步就是当系统执行一个事件的时候，不会等待该事件结束，而是会去继续执行其他事件，当这个异步事件有了响应结果之后，系统会在空闲的时候继续执行该事件。

​	简单来说就是js引擎会首先判断该事件是同步任务还是异步任务，如果是同步任务，将该事件压入宏任务队列中排队等待执行，如果是异步事件，则进入微任务队列中等待宏任务队列处于空闲状态时，再将微任务队列中的事件移入宏任务队列执行。这样我们就可以把不确定执行时间的一些事件用异步来执行。提高了程序运行的效率，而`Promise`就是`ECMAscript ES6`原生的对象，是解决javascript语言异步编程的==一种方法==。



### **Promise的核心概念**

​	Promise中的核心概念是==状态==，==状态转换==就是Promise执行异步事件的`时机`

​	在Promise中有存在3种状态，分别对应的是:

​	1、等待（==padding==）

​	2、承诺实现（==rosolve==）

​	3、承诺失效（==reject==）

​	Promise初始状态只能为等待的padding状态，在适当的时机，我们可以选择改变padding的状态到reoslve或者reject。

​	⚠️ Promise中的状态是不可逆转的，且仅允许改变一次,所以无法从resolve或reject状态再次切换到其他状态。当初始的padding改变为resolve或reject后，该Promise就相当于完成了它的使命，后续的异步处理就会交由一个==.then( )==的方法来实现。



### **Promise的基本构成**

​	在ES6语法中，Promise是一个`构造函数`，使用时需要用`new`关键词来创建实例对象。Promise构造函数中自带`excutor`执行器，excutor执行器中有2个JavaScript中默认的函数参数==resolve==，==reject==

​	==resolve==函数的作用是当Promise状态从padding转换到resolve时,可以把Promise中的对象或者变量当成参数传递出来供异步成功时调用，==reject==函数的作用是当Promise状态从padding转换到reject时候可以把Promise中的对象或者变量，以及系统报错当成参数传递出来供异步失败时调用。

​	==.then( )==是Promise原型上的一个方法，**`Promise.prototype.then()`** 所以通过构造函数创建的Promise实例对象也会自带.then( )方法。.then( )方法接受2个函数参数，作为Promise中异步成功和异步失败的2个回调函数。



​	**Promise实例的基本代码结构：**

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



❗️❗️❗️注意：Promise函数本身不是一个异步函数，在excutor执行器中运行的代码是同步的。执行异步的是.then( )方法中的事件

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



​	==.catch( )==也是Promise原型上的一个方法，用来接收和处理Promise中的异步失败，乍一看怎么和.then( )中第二个函数参数的功能是一样的嘞？没错滴，这2种方法都是用来处理异步失败的回调函数，但它们2个之间还是有一些小小的区别。🌟.then( )中第二个函数参数只能处理当前Promise异步失败的回调，而.catch( )可以处理整个`Promise链`上发生的异步失败的回调,便于异步失败和系统报错的整体处理。

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



### Promise链式调用

​	链式调用是Promise中一个特别重要的属性。也是Promise能处理异步操作的关键,





