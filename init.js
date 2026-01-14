const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 330;

const CELL_SIZE = 15;
const GRID_SIZE = 20;
const SCORE_MARGIN = 30;
let sizeOctopus = CELL_SIZE;
let positionOctopus = { positionX: 4, positionY: 8 };
let positionCachelo = { positionX: 8, positionY: 15 };
let lastTime = 0;
const SPEED = 900;
let scoreGame = 0;
let direction = "right";

const octopusImage = new Image();
octopusImage.src = "assets/images/octopus.png";

const cacheloImage = new Image();
cacheloImage.src = "assets/images/cachelo.png";

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
        break;
      }
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
        break;
      }
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
        break;
      }
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
        break;
      }
  }
});

function paintBackground() {
  ctx.fillStyle = "#9DBA6F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paintOctopus() {
  let sizeOctopus = CELL_SIZE * 3;

  let offset = (sizeOctopus - CELL_SIZE) / 2;

  let drawX = positionOctopus.positionX * CELL_SIZE - offset
  let drawY = positionOctopus.positionY * CELL_SIZE - offset + SCORE_MARGIN

  ctx.drawImage(octopusImage, drawX, drawY, sizeOctopus, sizeOctopus);
}

function paintCachelo() {
  let sizeCachelo = CELL_SIZE * 2;

  let offset = (sizeCachelo - CELL_SIZE) / 2;

  let positionX = positionCachelo.positionX * CELL_SIZE - offset
  let positionY = positionCachelo.positionY * CELL_SIZE - offset + SCORE_MARGIN

  ctx.drawImage(cacheloImage, positionX, positionY, sizeCachelo, sizeCachelo);
}

function paintScore(){
  ctx.fillStyle = "black"
  ctx.font = "16px Arial"
  ctx.fillText("Puntos: " + scoreGame, 10, 20)
}

function gameLoop(timestamp) {
  if (timestamp - lastTime >= SPEED) {
    if (direction === "right") {
      positionOctopus.positionX += 1;
    }
    if (direction === "left") {
      positionOctopus.positionX -= 1;
    }
    if (direction === "up") {
      positionOctopus.positionY -= 1;
    }
    if (direction === "down") {
      positionOctopus.positionY += 1;
    }

    const hasCaughtCachelo =
      positionOctopus.positionX === positionCachelo.positionX &&
      positionOctopus.positionY === positionCachelo.positionY;

    if (hasCaughtCachelo) {
      positionCachelo.positionX = Math.floor(Math.random() * GRID_SIZE);
      positionCachelo.positionY = Math.floor(Math.random() * GRID_SIZE);

      scoreGame += 10;
    }

    paintBackground()
    paintCachelo()
    paintOctopus()
    paintScore()

    lastTime = timestamp;
  }
  requestAnimationFrame(gameLoop);
}

paintBackground();
paintOctopus();

requestAnimationFrame(gameLoop);
