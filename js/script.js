const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = 450;
canvas.width = canvasSize;
canvas.height = canvasSize;

let direction = 'RIGHT';

let snake = [
  { x: 8 * box, y: 8 * box },
  { x: 7 * box, y: 8 * box },
  { x: 6 * box, y: 8 * box }
];

let food = generateFood(); 


function generateFood() {
  let newFood;
  
 
  do {
    newFood = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
  } while (isFoodOnSnake(newFood)); 

  return newFood;
}


function isFoodOnSnake(food) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === food.x && snake[i].y === food.y) {
      return true;
    }
  }
  return false;
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  ctx.fillStyle = 'black';
  ctx.fillRect(food.x, food.y, box, box);
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === 'RIGHT') head.x += box;
  if (direction === 'LEFT') head.x -= box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'DOWN') head.y += box;

  snake.unshift(head); 

  if (head.x === food.x && head.y === food.y) {
    food = generateFood(); 
  } else {
    snake.pop();
  }
}

function collision() {
  let head = snake[0];

  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function changeDirection(event) {
  if (event.keyCode === 37 && direction !== 'RIGHT') {
    direction = 'LEFT';
  } else if (event.keyCode === 38 && direction !== 'DOWN') {
    direction = 'UP';
  } else if (event.keyCode === 39 && direction !== 'LEFT') {
    direction = 'RIGHT';
  } else if (event.keyCode === 40 && direction !== 'UP') {
    direction = 'DOWN';
  }
}

function game() {
  if (collision()) {
    clearInterval(gameInterval);
    alert('Game Over!');
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  drawFood(); 
  moveSnake();
  drawSnake();
}

document.addEventListener('keydown', changeDirection);

const gameInterval = setInterval(game, 200);
