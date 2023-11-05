var canvas = document.getElementById("myCanvas");
canvas.width = screen.width - 45;
canvas.height = screen.height - 200;
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = getRndInteger(0, canvas.width);
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = getRndInteger(10, canvas.width - paddleWidth);
var rightPressed = false;
var leftPressed = false;
var score = 0;
var highestScore = 0;
var paddleSpeed = 4.5;

if (localStorage.getItem("GameScore") === null || localStorage.getItem("GameScore") === undefined) {
  highestScore = 0;
} else {
  highestScore = parseInt(localStorage.getItem("GameScore"));
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var increaseNO = []; // for increase speed
for (let i = 1; i <= 15; i++) {
  increaseNO.push(i * 7);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "15px Arial";
  ctx.fillText("Score: " + score, screen.width - 200, 50);
}
function drawHighestScore() {
  ctx.font = "17px Arial";
  ctx.fillText("Highest score: " + highestScore, screen.width - 200, 75);
}
function setHighestScore() {
  localStorage.setItem("GameScore", score);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawHighestScore();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      score++;
      document.getElementById("hitSound").play();
      if (score >= highestScore) {
        setHighestScore();
      }
      if (increaseNO.includes(score)) {
        paddleSpeed += 1.5;
        paddleWidth += 10;
      }
    } else {
      // "GAME OVER"
      document.getElementById("missSound").play();
      score = 0;
      clearInterval(interval);
      //document.location.reload();
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);
