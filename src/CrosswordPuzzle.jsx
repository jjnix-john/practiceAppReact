import { useMemo, useState } from 'react'
import './App.css'

const DEFAULT_GRID = [
  ['R', 'E', 'A', 'C', 'T'],
  ['H', 'O', 'O', 'K', 'S'],
  ['S', 'T', 'A', 'T', 'E'],
  ['P', 'R', 'O', 'P', 'S'],
  ['R', 'O', 'U', 'T', 'E'],
]

const ACROSS_CLUES = [
  { label: '1 Across', clue: 'A popular JavaScript library for building user interfaces.', answer: 'REACT' },
  { label: '2 Across', clue: 'React feature for stateful logic and side effects.', answer: 'HOOKS' },
  { label: '3 Across', clue: 'UI data that changes over time.', answer: 'STATE' },
  { label: '4 Across', clue: 'Data passed from parent to child components.', answer: 'PROPS' },
  { label: '5 Across', clue: 'React Router keyword used for navigation paths.', answer: 'ROUTE' },
]

export default function CrosswordPuzzle() {
  const [grid, setGrid] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill('')),
  )
  const [touched, setTouched] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false)),
  )

  const correctGrid = useMemo(() => DEFAULT_GRID, [])

  const downClues = useMemo(() => {
    const columns = DEFAULT_GRID[0].map((_, col) =>
      DEFAULT_GRID.map((row) => row[col]).join(''),
    )

    return columns.map((answer, index) => ({
      label: `${index + 1} Down`,
      clue: 'Read top to bottom in this column.',
      answer,
    }))
  }, [])

  const numbering = useMemo(() => {
    const numbers = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null))

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const across = col === 0 ? row + 1 : undefined
        const down = row === 0 ? col + 1 : undefined
        if (across || down) {
          numbers[row][col] = { across, down }
        }
      }
    }

    return numbers
  }, [])

  function setCellValue(row, col, value) {
    const upper = value.toUpperCase().replace(/[^A-Z]/g, '')
    setGrid((prev) => {
      const next = prev.map((r) => r.slice())
      next[row][col] = upper.slice(0, 1)
      return next
    })
    setTouched((prev) => {
      const next = prev.map((r) => r.slice())
      next[row][col] = true
      return next
    })
  }

  function resetGrid() {
    setGrid(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill('')),
    )
    setTouched(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false)),
    )
  }

  function isCellCorrect(row, col) {
    if (!touched[row][col]) return null
    return grid[row][col] === correctGrid[row][col]
  }

  const allCorrect = useMemo(() => {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (grid[r][c] !== correctGrid[r][c]) return false
      }
    }
    return true
  }, [grid, correctGrid])

  return (
    <div className="crossword">
      <div className="crossword-header">
        <h2>Crossword Puzzle</h2>
        <p>Fill in the grid using the clues.</p>
      </div>

      <div className="crossword-grid">
        {grid.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isCorrect = isCellCorrect(rowIndex, colIndex)
            const number = numbering[rowIndex][colIndex]

            return (
              <div key={`${rowIndex}-${colIndex}`} className="crossword-cell-wrapper">
                <div className="crossword-cell-number">
                  {number ? (
                    <>
                      {number.across ? `A${number.across}` : ''}
                      {number.across && number.down ? ' / ' : ''}
                      {number.down ? `D${number.down}` : ''}
                    </>
                  ) : null}
                </div>
                <input
                  value={cell}
                  maxLength={1}
                  className={`crossword-cell ${
                    isCorrect === true
                      ? 'correct'
                      : isCorrect === false
                      ? 'incorrect'
                      : ''
                  }`}
                  onChange={(e) => setCellValue(rowIndex, colIndex, e.target.value)}
                  aria-label={`Row ${rowIndex + 1} column ${colIndex + 1}`}
                  inputMode="latin"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            )
          }),
        )}
      </div>

      <div className="crossword-actions">
        <button onClick={resetGrid} className="secondary">
          Reset
        </button>
        <button onClick={() => setTouched(Array(5).fill(null).map(() => Array(5).fill(true)))}>
          Check answers
        </button>
      </div>

      {allCorrect && (
        <div className="crossword-success">
          🎉 All correct! Great job.
        </div>
      )}

      <div className="crossword-clues">
        <h3>Clues</h3>
        <div className="crossword-clues-grid">
          <div>
            <h4>Across</h4>
            <ol>
              {ACROSS_CLUES.map((clue) => (
                <li key={clue.label}>
                  <strong>{clue.label}</strong>: {clue.clue}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4>Down</h4>
            <ol>
              {downClues.map((clue) => (
                <li key={clue.label}>
                  <strong>{clue.label}</strong>: {clue.clue}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
