const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;


const CELL_SIZE = 15
let sizeOctopus = CELL_SIZE
const positionOctopus = {positionX: 4, positionY: 8}
let lastTime = 0
const SPEED = 900

const octopusImage = new Image()
octopusImage.src = "assets/images/octopus.png"

let direction = "right"

document.addEventListener("keydown", function(event) {
  switch(event.key) {
    case "ArrowUp":
      if(direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if(direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if(direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if(direction !== "left") direction = "right";
      break;
  }
});


function paintBackground() {
    ctx.fillStyle = "#9DBA6F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paintOctopus() {
    let positionX = positionOctopus.positionX * CELL_SIZE
    let positionY = positionOctopus.positionY * CELL_SIZE

    ctx.drawImage(octopusImage, positionX, positionY, sizeOctopus*3, sizeOctopus*3)
}

function gameLoop(timestamp) {
    if(timestamp - lastTime >= SPEED){
    
        if(direction === "right") positionOctopus.positionX += 1;
        if(direction === "left")  positionOctopus.positionX -= 1;
        if(direction === "up")    positionOctopus.positionY -= 1;
        if(direction === "down")  positionOctopus.positionY += 1;


        paintBackground()
        paintOctopus()

        lastTime = timestamp
    }
    requestAnimationFrame(gameLoop)
}

paintBackground()
paintOctopus()

requestAnimationFrame(gameLoop)
