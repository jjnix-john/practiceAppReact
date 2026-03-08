import { useEffect, useMemo, useState } from 'react'
import './App.css'

const WORDS = [
  'apple', 'baker', 'cider', 'donut', 'eagle', 'flute', 'grape', 'hinge', 'image', 'joker',
  'karma', 'lemon', 'mango', 'naval', 'oasis', 'piano', 'quart', 'river', 'satin', 'tiger',
  'urban', 'vital', 'whale', 'xenon', 'yacht', 'zebra', 'asset', 'blend', 'charm', 'drama',
  'ember', 'fable', 'giant', 'honey', 'ivory', 'jelly', 'kneel', 'layer', 'moral', 'noble',
  'olive', 'pride', 'quiet', 'rusty', 'spice', 'thrive', 'union', 'vivid', 'woven', 'youth',
]

function pickRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase()
}

function mapGuessToFeedback(guess, solution) {
  const feedback = Array(5).fill('absent')
  const solutionLetters = solution.split('')

  // First pass: mark correct letters
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === solution[i]) {
      feedback[i] = 'correct'
      solutionLetters[i] = null
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < 5; i += 1) {
    if (feedback[i] === 'correct') continue
    const idx = solutionLetters.indexOf(guess[i])
    if (idx !== -1) {
      feedback[i] = 'present'
      solutionLetters[idx] = null
    }
  }

  return feedback
}

export default function Wordle() {
  const [solution, setSolution] = useState(() => pickRandomWord())
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [status, setStatus] = useState('')

  const isGameOver = useMemo(() => {
    return (
      guesses.some((g) => g.guess === solution) || guesses.length >= 6
    )
  }, [guesses, solution])

  useEffect(() => {
    if (guesses.some((g) => g.guess === solution)) {
      setStatus('You guessed it! 🎉')
    } else if (guesses.length >= 6) {
      setStatus(`Out of tries — the word was ${solution}`)
    } else {
      setStatus('')
    }
  }, [guesses, solution])

  function handleSubmit(e) {
    e.preventDefault()
    const normalized = guess.trim().toUpperCase()
    if (normalized.length !== 5 || /[^A-Z]/.test(normalized)) {
      setStatus('Please enter a valid 5-letter word.')
      return
    }
    if (guesses.some((g) => g.guess === normalized)) {
      setStatus('You already tried that word.')
      return
    }

    const feedback = mapGuessToFeedback(normalized, solution)
    setGuesses((prev) => [...prev, { guess: normalized, feedback }])
    setGuess('')
  }

  function handleRestart() {
    setSolution(pickRandomWord())
    setGuess('')
    setGuesses([])
    setStatus('')
  }

  return (
    <div className="wordle">
      <div className="wordle-header">
        <h1>Wordle</h1>
        <p className="wordle-subtitle">Guess the 5-letter word in 6 tries.</p>
      </div>

      <div className="wordle-grid">
        {Array.from({ length: 6 }).map((_, row) => {
          const entry = guesses[row]
          const letters = entry ? entry.guess.split('') : Array(5).fill('')
          const feedback = entry ? entry.feedback : Array(5).fill('')

          return (
            <div key={row} className="wordle-row">
              {letters.map((char, col) => (
                <div
                  key={col}
                  className={`wordle-cell ${feedback[col] || ''}`}
                >
                  {char}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <form className="wordle-form" onSubmit={handleSubmit}>
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          maxLength={5}
          disabled={isGameOver}
          placeholder="Enter 5 letters"
        />
        <button type="submit" disabled={isGameOver || guess.trim().length !== 5}>
          Guess
        </button>
        <button type="button" onClick={handleRestart}>
          Restart
        </button>
      </form>

      <div className="wordle-status" aria-live="polite">
        {status}
      </div>

      <div className="wordle-help">
        <p>
          <strong>Hint:</strong> Correct letters in the right spot are <span className="cell correct">green</span>,
          correct letters in the wrong spot are <span className="cell present">yellow</span>,
          and letters not in the word are <span className="cell absent">gray</span>.
        </p>
      </div>
    </div>
  )
}
