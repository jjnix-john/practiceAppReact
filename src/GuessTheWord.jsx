import { useState } from 'react'

const words = ['react', 'javascript', 'coding', 'developer', 'frontend']

export default function GuessTheWord() {
  const [word] = useState(words[Math.floor(Math.random() * words.length)])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(6)

  const maskedWord = word
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ')

  function handleGuess() {
    const letter = input.toLowerCase()

    if (!letter || guessedLetters.includes(letter)) return

    setGuessedLetters([...guessedLetters, letter])

    if (!word.includes(letter)) {
      setAttempts(attempts - 1)
    }

    setInput('')
  }

  const isWinner = word.split('').every((l) => guessedLetters.includes(l))
  const isGameOver = attempts <= 0

  function resetGame() {
    window.location.reload()
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Guess The Word</h2>
      <h3>{maskedWord}</h3>

      <p>Attempts left: {attempts}</p>

      {!isWinner && !isGameOver && (
        <>
          <input
            type="text"
            maxLength="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleGuess}>Guess</button>
        </>
      )}

      {isWinner && <h3>🎉 You Win!</h3>}
      {isGameOver && <h3>💀 Game Over! Word was: {word}</h3>}

      {(isWinner || isGameOver) && (
        <button onClick={resetGame}>Play Again</button>
      )}
    </div>
  )
}