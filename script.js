const gameBoard = document.getElementById('game-board');
const context = gameBoard.getContext('2d');
const cellSize = 20;
const cellCount = gameBoard.width / cellSize;

let snake = [
  { x: cellCount / 2 * cellSize, y: cellCount / 2 * cellSize }
];
let direction = 'right';
let food = { x: 0, y: 0 };

function draw() {
  context.clearRect(0, 0, gameBoard.width, gameBoard.height);
  context.fillStyle = 'green';
  for (let cell of snake) {
    context.fillRect(cell.x, cell.y, cellSize, cellSize);
  }
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, cellSize, cellSize);
}

function update() {
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === 'up') {
    head.y -= cellSize;
  } else if (direction === 'down') {
    head.y += cellSize;
  } else if (direction === 'left') {
    head.x -= cellSize;
  } else if (direction === 'right') {
    head.x += cellSize;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * cellCount) * cellSize, y: Math.floor(Math.random() * cellCount) * cellSize };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  let head = snake[0];
  if (head.x < 0 || head.x >= gameBoard.width || head.y < 0 || head.y >= gameBoard.height) {
    return true;
  }
  for (let cell of snake.slice(1)) {
    if (head.x === cell.x && head.y === cell.y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  if (checkCollision()) {
    clearInterval(interval);
    alert('Game over!');
  }
  update();
  draw();
}

let interval = setInterval(gameLoop, 100);

document.getElementById('up').addEventListener('click', () => {
  direction = 'up';
});

document.getElementById('down').addEventListener('click', () => {
  direction = 'down';
});

document.getElementById('left').addEventListener('click', () => {
  direction = 'left';
});

document.getElementById('right').addEventListener('click', () => {
  direction = 'right';
});