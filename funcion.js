var gameContainer = document.getElementById("game-container");
var paddleLeft = document.getElementById("paddle-left");
var paddleRight = document.getElementById("paddle-right");
var ball = document.getElementById("ball");
var ballX = 395;
var ballY = 195;
var ballSpeedX = -2;
var ballSpeedY = 2;
var paddleSpeed = 5;
var isPaused = false;
document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    isPaused = !isPaused;
  }
});

function moveBall() {
  if (!isPaused) {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= 390) {
      ballSpeedY *= -1;
    }

    if (ballX < 0 || ballX > 790) {
      if (ballX < 0) {
        // Paddle left missed the ball
        alert("PUUNTOOOO para el jugador DOOOS!!");
      } else {
        // Paddle right missed the ball
        alert("PUUNTOOOO para el jugador UNOOO!!");
      }
      reset();
    }

    // Detectar colisión con las paletas
    if (ballX < 20 && ballY + 10 >= paddleLeft.offsetTop && ballY <= paddleLeft.offsetTop + 80) {
      ballSpeedX *= -1;
    }

    if (ballX > 770 && ballY + 10 >= paddleRight.offsetTop && ballY <= paddleRight.offsetTop + 80) {
      ballSpeedX *= -1;
    }
  }
}

function movePaddles() {
  if (isPaused) return;

  if (paddleLeft.offsetTop >= 0 && keysState.w) {
    paddleLeft.style.top = paddleLeft.offsetTop - paddleSpeed + "px";
  }
  if (paddleLeft.offsetTop <= 320 && keysState.s) {
    paddleLeft.style.top = paddleLeft.offsetTop + paddleSpeed + "px";
  }
  if (paddleRight.offsetTop >= 0 && keysState.ArrowUp) {
    paddleRight.style.top = paddleRight.offsetTop - paddleSpeed + "px";
  }
  if (paddleRight.offsetTop <= 320 && keysState.ArrowDown) {
    paddleRight.style.top = paddleRight.offsetTop + paddleSpeed + "px";
  }
}

function update() {
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

function updateKeysState(event, isPressed) {
  if (event.key in keysState) {
    keysState[event.key] = isPressed;
  }
}

function reset() {
  ballX = 395;
  ballY = 195;
  ballSpeedX = -2;
  ballSpeedY = 2;
}

var keysState = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false
};

setInterval(function () {
  moveBall();
  movePaddles();
  update();
}, 10);

document.addEventListener("keydown", function(event) {
  updateKeysState(event, true);
});

document.addEventListener("keyup", function(event) {
  updateKeysState(event, false);
});
