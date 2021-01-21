import Food from "./Food";
import Message from "./Message";
import Snake from "./Snake";
class Control{
    food:Food
    message:Message
    snake:Snake
    type:number=0
    isEnd:boolean=true
    typing:number=0
    constructor() {
        this.food=new Food()
        this.message=new Message()
        this.snake=new Snake()
        this.init()
    }
    init(){
        this.food.setChange()
        document.addEventListener('keydown',this.keyDown.bind(this))


    }
    keyDown(event:KeyboardEvent){
        this.type=event.keyCode
        this.run()

    }
    run(){
            //游戏是否结束
            if(!this.isEnd){
                return
            }
            let X= this.snake.getHx()
            let Y =this.snake.getHy()
            switch (this.type) {
                case 37:
                    console.log('左移')
                    X-=20
                    break;
                case 38:
                    console.log('上移')
                    Y-=20
                    break;
                case 39:
                    console.log('右移')
                    X+=20
                    break;
                case 40:
                    console.log('下移')
                    Y+=20
                    break;
                default:
                    return;
            }
            this.check(X,Y)
            if(this.isEnd){
                this.snake.setHx(X)
                this.snake.setHy(Y)
            }else{
                alert('撞墙啦~')
                return
            }
            this.isEnd && setTimeout(this.run.bind(this),1000)
    }
    //检查是否撞墙
    check(x:number,y:number){
        if(x>=0 && x<=480 && y>=0 && y<=380){
            return
        }else{
            this.isEnd=false
        }
    }
    //检查是否吃到食物了
    checkEat(){

    }

}

export default Control
