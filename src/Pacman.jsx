import { useEffect, useRef, useState } from 'react'
import './Pacman.css'

const Pacman = () => {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  // Game constants
  const BLOCK_SIZE = 20
  const CANVAS_WIDTH = 400
  const CANVAS_HEIGHT = 400

  // Maze layout (1 = wall, 0 = path, 2 = dot, 3 = power pellet)
  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 3, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 3, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 3, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1],
    [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]

  // Game state
  const [pacman, setPacman] = useState({ x: 9, y: 15, direction: 'right' })
  const [ghost, setGhost] = useState({ x: 9, y: 9, direction: 'up' })
  const [dots, setDots] = useState([])
  const [powerPellets, setPowerPellets] = useState([])

  useEffect(() => {
    // Initialize dots and power pellets
    const initialDots = []
    const initialPowerPellets = []
    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 2) initialDots.push({ x, y })
        if (cell === 3) initialPowerPellets.push({ x, y })
      })
    })
    setDots(initialDots)
    setPowerPellets(initialPowerPellets)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Draw maze
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw walls
    ctx.fillStyle = '#0000ff'
    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
        }
      })
    })

    // Draw dots
    ctx.fillStyle = '#ffff00'
    dots.forEach(dot => {
      ctx.beginPath()
      ctx.arc(dot.x * BLOCK_SIZE + BLOCK_SIZE / 2, dot.y * BLOCK_SIZE + BLOCK_SIZE / 2, 2, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw power pellets
    ctx.fillStyle = '#ffff00'
    powerPellets.forEach(pellet => {
      ctx.beginPath()
      ctx.arc(pellet.x * BLOCK_SIZE + BLOCK_SIZE / 2, pellet.y * BLOCK_SIZE + BLOCK_SIZE / 2, 5, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw Pacman
    ctx.fillStyle = '#ffff00'
    ctx.beginPath()
    ctx.arc(pacman.x * BLOCK_SIZE + BLOCK_SIZE / 2, pacman.y * BLOCK_SIZE + BLOCK_SIZE / 2, BLOCK_SIZE / 2 - 2, 0, 2 * Math.PI)
    ctx.fill()

    // Draw ghost
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(ghost.x * BLOCK_SIZE + 2, ghost.y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4)

  }, [pacman, ghost, dots, powerPellets])

  // Game loop
  useEffect(() => {
    if (gameOver || gameWon) return

    const gameLoop = setInterval(() => {
      // Move Pacman
      setPacman(prev => {
        let newX = prev.x
        let newY = prev.y

        switch (prev.direction) {
          case 'up': newY--; break
          case 'down': newY++; break
          case 'left': newX--; break
          case 'right': newX++; break
        }

        // Check collision with walls
        if (maze[newY] && maze[newY][newX] !== 1) {
          return { ...prev, x: newX, y: newY }
        }
        return prev
      })

      // Move ghost (simple AI)
      setGhost(prev => {
        const directions = ['up', 'down', 'left', 'right']
        const randomDirection = directions[Math.floor(Math.random() * directions.length)]
        let newX = prev.x
        let newY = prev.y

        switch (randomDirection) {
          case 'up': newY--; break
          case 'down': newY++; break
          case 'left': newX--; break
          case 'right': newX++; break
        }

        if (maze[newY] && maze[newY][newX] !== 1) {
          return { ...prev, x: newX, y: newY, direction: randomDirection }
        }
        return prev
      })

      // Check collisions
      setPacman(prevPacman => {
        setGhost(prevGhost => {
          if (prevPacman.x === prevGhost.x && prevPacman.y === prevGhost.y) {
            setGameOver(true)
          }
          return prevGhost
        })
        return prevPacman
      })

      // Check dot collection
      setDots(prevDots => {
        const newDots = prevDots.filter(dot => !(dot.x === pacman.x && dot.y === pacman.y))
        if (newDots.length !== prevDots.length) {
          setScore(prev => prev + 10)
        }
        return newDots
      })

      // Check power pellet collection
      setPowerPellets(prevPellets => {
        const newPellets = prevPellets.filter(pellet => !(pellet.x === pacman.x && pellet.y === pacman.y))
        if (newPellets.length !== prevPellets.length) {
          setScore(prev => prev + 50)
        }
        return newPellets
      })

      // Check win condition
      if (dots.length === 0 && powerPellets.length === 0) {
        setGameWon(true)
      }

    }, 200)

    return () => clearInterval(gameLoop)
  }, [pacman, ghost, dots, powerPellets, gameOver, gameWon])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp': setPacman(prev => ({ ...prev, direction: 'up' })); break
        case 'ArrowDown': setPacman(prev => ({ ...prev, direction: 'down' })); break
        case 'ArrowLeft': setPacman(prev => ({ ...prev, direction: 'left' })); break
        case 'ArrowRight': setPacman(prev => ({ ...prev, direction: 'right' })); break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const resetGame = () => {
    setPacman({ x: 9, y: 15, direction: 'right' })
    setGhost({ x: 9, y: 9, direction: 'up' })
    setScore(0)
    setGameOver(false)
    setGameWon(false)
    // Reinitialize dots and pellets
    const initialDots = []
    const initialPowerPellets = []
    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 2) initialDots.push({ x, y })
        if (cell === 3) initialPowerPellets.push({ x, y })
      })
    })
    setDots(initialDots)
    setPowerPellets(initialPowerPellets)
  }

  return (
    <div className="pacman-game">
      <div className="game-info">
        <div>Score: {score}</div>
        <button onClick={resetGame} className="reset-button">Reset Game</button>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="pacman-canvas"
      />
      {gameOver && <div className="game-message game-over">Game Over!</div>}
      {gameWon && <div className="game-message game-won">You Won!</div>}
      <div className="controls">
        <p>Use arrow keys to move Pacman</p>
        <p>Collect all dots to win!</p>
      </div>
    </div>
  )
}

export default Pacman