class Food {
    food: HTMLElement
    constructor() {
        this.food = document.getElementById('food')!
    }
    //Y轴坐标
    getTop() {
        return this.food.offsetTop
    }
    //X轴坐标
    getLeft() {
        return this.food.offsetLeft
    }
    //随机生成食物坐标
    setChange() {
        let x = Math.floor(Math.random() * 480)
        let y = Math.floor(Math.random() * 380)
        this.food.style.top = y + 'px'
        this.food.style.left = x + 'px'
    }
}

export default Food
