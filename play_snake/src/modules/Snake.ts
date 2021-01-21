class Snake{
    snake:HTMLElement
    snakeHeader:HTMLElement
    snakeBody:HTMLCollection
    constructor() {
        this.snake=document.getElementById('snake')!
        this.snakeHeader=document.getElementById('header')!
        this.snakeBody=this.snake.getElementsByTagName('div')
    }
    //获取蛇头X坐标
    getHx(){
        return this.snakeHeader.offsetLeft
    }
    //获取蛇头Y坐标
    getHy(){
        return this.snakeHeader.offsetTop
    }
    //设置蛇头X坐标
    setHx(value:number|string) {
        if(value==this.getHx()){
            return
        }else{
            this.snakeHeader.style.left=value+'px'
        }
    }
    //设置蛇头Y坐标
    setHy(value:number|string){
        if(value==this.getHy()){
            return
        }else{
            this.snakeHeader.style.top=value+'px'
        }
    }


}
export default Snake
