
function init() {
    canvas = document.getElementById('myCanvas');
    W = canvas.width = 500;
    H = canvas.height = 500;
    board = canvas.getContext('2d');
    cs = 35;
    game_over = false;
    food=getRandomFood();
    snake = {
        init_len: 5,
        color: 'yellow',
        cells: [],
        direction: 'right',
        createSnake: function () {
            for (var i = 1; i <= this.init_len; i++) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function () {
            board.fillStyle = this.color;

            for (var i = 0; i < this.cells.length; i++) {
                board.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }

        },
        updateSnake: function () {
            // var removedCell = snake.cells[0];
            // clearRect(removedCell.x * cs, removedCell.y * cs, cs, cs);
            var cell = this.cells[this.cells.length - 1];
            
            if(cell.x==food.foodX && cell.y==food.foodY){
                food=getRandomFood();
            }else{
                this.cells.shift();
            }

            if (this.direction == 'right') {
                this.cells.push({ x: cell.x + 1, y: cell.y });
            }
            else if (this.direction == 'down') {
                this.cells.push({ x: cell.x, y: cell.y + 1 });
            }
            else if (this.direction == 'up') {
                this.cells.push({ x: cell.x, y: cell.y - 1 });
            }
            else if (this.direction == 'left') {
                this.cells.push({ x: cell.x - 1, y: cell.y });
            }

            var firstCell = this.cells[this.cells.length - 1];
            if (firstCell.x < 0 || firstCell.x * cs > W || firstCell.y < 0 || firstCell.y * cs > H) {
                game_over = true;
            }
        }
    }
    snake.createSnake();

    //event listener
    document.addEventListener('keydown', function (e) {
        //   console.log(e);
        if (e.key == 'ArrowUp') snake.direction = 'up';
        else if (e.key == 'ArrowDown') snake.direction = 'down';
        else if (e.key == 'ArrowRight') snake.direction = 'right';
        else if (e.key == 'ArrowLeft') snake.direction = 'left';
    });

}
function draw() {
    board.clearRect(0, 0, W, H);
    snake.drawSnake();
    board.fillStyle=food.color;
    board.fillRect(food.foodX*cs,food.foodY*cs,cs,cs);
}
function update() {
    snake.updateSnake();
}
function gameLoop() {
    if(game_over==true){
        clearInterval(f);
        alert("OOPS ! GAME OVER !");
    }
    draw();
    update();
}
function getRandomFood(){
   var food={
        foodX:Math.round(Math.random()*((W-cs)/cs)),
        foodY:Math.round(Math.random()*((H-cs)/cs)),
        color:'red'
    }
    return food;
}
init();
var f = setInterval(gameLoop, 100);

