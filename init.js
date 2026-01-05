const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;
ctx.fillStyle = "#9DBA6F";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const CELL_SIZE = 15
let sizeOctopus = CELL_SIZE
const positionOctopus = {positionX: 4, positionY: 8}

let positionX = positionOctopus.positionX * CELL_SIZE
let positionY = positionOctopus.positionY * CELL_SIZE

ctx.fillStyle = "#3d4d23ff"
ctx.fillRect(positionX, positionY, sizeOctopus, sizeOctopus)