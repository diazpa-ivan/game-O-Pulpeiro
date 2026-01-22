const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")
const startButton = document.querySelector("#start-button")
const startMenu = document.querySelector("#start-menu")
const splash = document.querySelector("#splash-screen")
const gameMusic = new Audio("assets/song-game.mp3")
const soundToggle = document.querySelector("#sound-toggle")
const CELL_SIZE = 15
const GRID_SIZE = 20
const SCORE_MARGIN = 30
const GAME_COVER_DURATION = 3000
gameMusic.loop = true
gameMusic.preload = "auto"
gameMusic.load()
gameMusic.volume = 0.4

canvas.width = 300
canvas.height = 330

let sizeOctopus = CELL_SIZE
let octopusCharacter = [{ x: 4, y: 8 }]
let initialPositionCachelo = { x: 8, y: 15 }
let lastTime = 0
let speedOctopus = 450
let scoreGame = 0
let direction = "right"
let isGameOver = false
let highScores = [0, 0, 0]

const octopusImage = new Image()
octopusImage.src = "assets/images/octopus.png"

const cacheloImage = new Image()
cacheloImage.src = "assets/images/cachelo.png"

soundToggle.addEventListener("click", () => {
  gameMusic.muted = !gameMusic.muted

  soundToggle.innerText = gameMusic.muted ? "🔇" : "🔊"
})

setTimeout(() => {
  splash.style.display = "none"
}, GAME_COVER_DURATION)

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
  octopusCharacter = [{ x: 4, y: 8 }]
  speedOctopus = 900
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

  octopusCharacter.forEach((segmento) => {
    let drawX = segmento.x * CELL_SIZE - offset
    let drawY = segmento.y * CELL_SIZE - offset + SCORE_MARGIN

    ctx.drawImage(octopusImage, drawX, drawY, sizeOctopus, sizeOctopus)
  })
}

function paintCachelo() {
  let sizeCachelo = CELL_SIZE * 2

  let offset = (sizeCachelo - CELL_SIZE) / 2

  let positionX = initialPositionCachelo.x * CELL_SIZE - offset
  let positionY = initialPositionCachelo.y * CELL_SIZE - offset + SCORE_MARGIN

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

  if (timestamp - lastTime >= speedOctopus) {
    let newHead = { x: octopusCharacter[0].x, y: octopusCharacter[0].y }

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

    octopusCharacter.unshift(newHead)

    const hasCaughtCachelo =
      newHead.x === initialPositionCachelo.x &&
      newHead.y === initialPositionCachelo.y

    if (hasCaughtCachelo) {
      initialPositionCachelo.x = Math.floor(Math.random() * GRID_SIZE)
      initialPositionCachelo.y = Math.floor(Math.random() * GRID_SIZE)

      scoreGame += 10
      if (speedOctopus > 150) {
        speedOctopus -= 100
      }
    }

    if (!hasCaughtCachelo) {
      octopusCharacter.pop()
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
