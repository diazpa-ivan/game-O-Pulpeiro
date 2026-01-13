const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

const CELL_SIZE = 15;
const GRID_SIZE = 20;
let sizeOctopus = CELL_SIZE;
let positionOctopus = { positionX: 4, positionY: 8 };
let positionCachelo = { positionX: 8, positionY: 15 };
let lastTime = 0;
const SPEED = 900;

const octopusImage = new Image();
octopusImage.src = "assets/images/octopus.png";

let direction = "right";

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
  let targetSize = CELL_SIZE * 3;

  let offset = (targetSize - CELL_SIZE) / 2;

  let drawX = positionOctopus.positionX * CELL_SIZE - offset;
  let drawY = positionOctopus.positionY * CELL_SIZE - offset;

  ctx.drawImage(octopusImage, drawX, drawY, targetSize, targetSize);
}

function paintCachelo() {
  let positionX = positionCachelo.positionX * CELL_SIZE;
  let positionY = positionCachelo.positionY * CELL_SIZE;

  ctx.fillStyle = "orange";
  ctx.fillRect(positionX, positionY, CELL_SIZE, CELL_SIZE);
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
    }

    paintBackground();
    paintCachelo();
    paintOctopus();

    lastTime = timestamp;
  }
  requestAnimationFrame(gameLoop);
}

paintBackground();
paintOctopus();

requestAnimationFrame(gameLoop);
