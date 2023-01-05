let score = document.getElementById('score');
score.innerHTML = 0

let speed = document.querySelector('input[name="speed"]:checked').value;

let canvas  = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 12;
let snake = [];
snake [0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 30 + 1) * box,
    y: Math.floor(Math.random() * 30 + 1) * box
}


function createBG() {
    context.fillStyle = 'rgb(4, 2, 12)';
    context.fillRect(0, 0, 200 * box, 300 * box);
}

function createSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle= 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function createFood(){
    context.fillStyle = 'rgb(140, 16, 211)';
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction !== 'right') direction = 'left';
    if(event.keyCode == 38 && direction !== 'down') direction = 'up';
    if(event.keyCode == 39 && direction !== 'left') direction = 'right';
    if(event.keyCode == 40 && direction !== 'up') direction = 'down';
}

function startGame(){
    if(snake[0].x > 83 * box) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 83 * box;
    if(snake[0].y > 42 * box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 42 * box;
    
    for (let i= 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game OVer :(')
        }
    }

    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        score.innerHTML++
        food.x = Math.floor(Math.random() * 83 + 1) * box;
        food.y = Math.floor(Math.random() * 42 + 1) * box; 
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function restartGame(){
    clearInterval(game);
    
    score.innerHTML = 0
    
    snake = [];
    snake [0] = {
        x: 8 * box,
        y: 8 * box
    }

    food.x = Math.floor(Math.random() * 83 + 1) * box;
    food.y = Math.floor(Math.random() * 42 + 1) * box;
    
    speed = document.querySelector('input[name="speed"]:checked').value

    game = setInterval(startGame, (160 / speed));
}

let game = setInterval(startGame, 160);