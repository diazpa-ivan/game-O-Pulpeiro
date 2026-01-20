const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const startButton = document.getElementById("start-button")
const startMenu = document.getElementById("start-menu")
const splash = document.getElementById("splash-screen")
const gameMusic = new Audio("assets/song-game.mp3")
const soundToggle = document.getElementById("sound-toggle")
gameMusic.loop = true
gameMusic.preload = "auto"
gameMusic.load()
gameMusic.volume = 0.4

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
let highScores = [0, 0, 0]
let musicMuted = false

const octopusImage = new Image()
octopusImage.src = "assets/images/octopus.png"

const cacheloImage = new Image()
cacheloImage.src = "assets/images/cachelo.png"

soundToggle.addEventListener("click", () => {
  musicMuted = !musicMuted
  gameMusic.muted = musicMuted

  if (musicMuted) {
    soundToggle.innerText = "🔇"
  } else {
    soundToggle.innerText = "🔊"
  }
})

setTimeout(() => {
  splash.style.display = "none"
}, 4000)

startButton.addEventListener("click", () => {
  resetGame()
  startMenu.style.display = "none"
  gameMusic.play()
  requestAnimationFrame(gameLoop)
})

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

function resetGame() {
  updateHighScoreMenu()
  isGameOver = false
  scoreGame = 0
  octopusBody = [{ x: 4, y: 8 }]
  SPEED_OCTOPUS = 900
  direction = "right"
  lastTime = 0
}

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

function updateHighScoreMenu() {
  const scoreElements = document.querySelectorAll("#score-list li")

  highScores.forEach((score, index) => {
    if (scoreElements[index]) {
      scoreElements[index].innerText = score > 0 ? score : "---"
    }
  })
}

function checkGameOver(head) {
  const outGrid =
    head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE

  if (outGrid) {
    highScores.unshift(scoreGame)
    highScores.sort((a, b) => {
      return b - a
    })
    highScores = highScores.slice(0, 3)
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
    canvas.height / 2 + 40,
  )
  setTimeout(() => {
    startMenu.style.display = "flex"
    updateHighScoreMenu()
  }, 2000)
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
        SPEED_OCTOPUS -= 100
      }
    }

    if (!hasCaughtCachelo) {
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
