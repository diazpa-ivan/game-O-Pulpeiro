const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = 300
canvas.height = 330

const CELL_SIZE = 15
const GRID_SIZE = 20
const SCORE_MARGIN = 30
let sizeOctopus = CELL_SIZE
let octopusBody = [{ x: 4, y: 8 }]
let positionCachelo = { x: 8, y: 15 }
let lastTime = 0
let SPEED_OCTOPUS = 900
let scoreGame = 0
let direction = "right"
let isGameOver = false

const octopusImage = new Image()
octopusImage.src = "assets/images/octopus.png"

const cacheloImage = new Image()
cacheloImage.src = "assets/images/cachelo.png"

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up"
        break
      }
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down"
        break
      }
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left"
        break
      }
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right"
        break
      }
  }
})

function paintBackground() {
  ctx.fillStyle = "#9DBA6F"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function paintOctopus() {
  let sizeOctopus = CELL_SIZE * 3
  let offset = (sizeOctopus - CELL_SIZE) / 2

  octopusBody.forEach((segmento) => {
    let drawX = segmento.x * CELL_SIZE - offset
    let drawY = segmento.y * CELL_SIZE - offset + SCORE_MARGIN

    ctx.drawImage(octopusImage, drawX, drawY, sizeOctopus, sizeOctopus)
  })
}

function paintCachelo() {
  let sizeCachelo = CELL_SIZE * 2

  let offset = (sizeCachelo - CELL_SIZE) / 2

  let positionX = positionCachelo.x * CELL_SIZE - offset
  let positionY = positionCachelo.y * CELL_SIZE - offset + SCORE_MARGIN

  ctx.drawImage(cacheloImage, positionX, positionY, sizeCachelo, sizeCachelo)
}

function paintScore() {
  ctx.fillStyle = "black"
  ctx.font = "16px Arial"
  ctx.fillText("Puntos: " + scoreGame, 10, 20)
}

function checkGameOver(head) {
  const outGrid =
    head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE

  if (outGrid) {
    isGameOver = true
  }
}

function paintGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "white"
  ctx.font = "30px Arial"
  ctx.textAlign = "center"
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2)
  ctx.fillText(
    "Puntuación: " + scoreGame,
    canvas.width / 2,
    canvas.height / 2 + 40
  )
}

function gameLoop(timestamp) {
  if (isGameOver) {
    paintGameOver()
    return
  }

  if (timestamp - lastTime >= SPEED_OCTOPUS) {
    let newHead = { x: octopusBody[0].x, y: octopusBody[0].y }

    if (direction === "right") {
      newHead.x += 1
    }
    if (direction === "left") {
      newHead.x -= 1
    }
    if (direction === "up") {
      newHead.y -= 1
    }
    if (direction === "down") {
      newHead.y += 1
    }

    checkGameOver(newHead)

    octopusBody.unshift(newHead)

    const hasCaughtCachelo =
      newHead.x === positionCachelo.x && newHead.y === positionCachelo.y

    if (hasCaughtCachelo) {
      positionCachelo.x = Math.floor(Math.random() * GRID_SIZE)
      positionCachelo.y = Math.floor(Math.random() * GRID_SIZE)

      scoreGame += 10
      if (SPEED_OCTOPUS > 150) {
        SPEED_OCTOPUS -= 120
      }
    }

    if(!hasCaughtCachelo){
      octopusBody.pop()
    }

    paintBackground()
    paintCachelo()
    paintOctopus()
    paintScore()

    lastTime = timestamp
  }
  requestAnimationFrame(gameLoop)
}

paintBackground()
paintOctopus()

requestAnimationFrame(gameLoop)
