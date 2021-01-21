
class Message{
    count:HTMLElement
    level:HTMLElement
    constructor() {
        this.count=document.getElementById('count')!
        this.level=document.getElementById('level')!
        this.count.innerText='0'
        this.level.innerText='1'
    }
    //分数+1
    addCount(){
        let num =Number(this.count.innerText)
        this.count.innerText=num+1+''
    }
    //等级+1
    addLevel(){
        let num =Number(this.level.innerText)
        this.level.innerText=num+1+''
    }

}
export  default  Message
