import Food from './Food'
import Message from "./Message";
import Snake from "./Snake";

class Control{
    food:Food
    message:Message
    snake:Snake
    constructor() {
        this.food=new Food()
        this.message=new Message()
        this.snake=new Snake()
    }

}

export default  Control