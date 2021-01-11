# Promise入门到精通(中级篇)-附代码详细讲解



### Promise.resolve

是一个语法糖

new Promise(resolve=>{

})







### Promise.reject



### Promise.findly



### Promise.all

Interable 可迭代对象 array map set

整合接口 

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





