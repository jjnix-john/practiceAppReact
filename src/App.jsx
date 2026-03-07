import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom'
import './App.css'
import Counter from './Counter.jsx'
import Calculator from './Calculator.jsx'
import TaskManager from './TaskManager.jsx'
import CoinFlipper from './Coinflipper.jsx'
import RollingDice from './RollingDice.jsx'
import QRCodeGenerator from './QRCodeGenerator.jsx'
import RandomQuote from './RandomQoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="counter"
            element={
              <Page title="Counter">
                <Counter />
              </Page>
            }
          />
          <Route
            path="calculator"
            element={
              <Page title="Calculator">
                <Calculator />
              </Page>
            }
          />
          <Route
            path="tasks"
            element={
              <Page title="Task Manager">
                <TaskManager />
              </Page>
            }
          />
          <Route
            path="coin-flip"
            element={
              <Page title="Coin Flipper">
                <CoinFlipper />
              </Page>
            }
          />
          <Route
            path="dice"
            element={
              <Page title="Rolling Dice">
                <RollingDice />
              </Page>
            }
          />
          <Route
            path="qr-code"
            element={
              <Page title="QR Code Generator">
                <QRCodeGenerator />
              </Page>
            }
          />
          <Route
            path="random-quote"
            element={
              <Page title="Random Quote">
                <RandomQuote />
              </Page>
            }
          />
          <Route
            path="tic-tac-toe"
            element={
              <Page title="Tic Tac Toe">
                <Board />
              </Page>
            }
          />
          <Route
            path="todo"
            element={
              <Page title="Todo List">
                <TodoApp />
              </Page>
            }
          />
          <Route
            path="adjustable-button"
            element={
              <Page title="Adjustable Button">
                <AdjustableSizedButton />
              </Page>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">React Playground</h1>
          <p className="app-subtitle">Select a mini app to explore from the dashboard.</p>
        </div>
        <nav className="app-nav">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <span>Built with React + Vite</span>
      </footer>
    </div>
  )
}

function Page({ title, children }) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>{title}</h2>
        </div>
        <Link className="button secondary" to="/">
          ← Back to dashboard
        </Link>
      </div>

      <div className="page-body">{children}</div>
    </div>
  )
}

function Dashboard() {
  const cards = [
    {
      to: '/counter',
      title: 'Counter',
      description: 'Increment, decrement, and reset a counter.',
    },
    {
      to: '/calculator',
      title: 'Calculator',
      description: 'A simple calculator for basic operations.',
    },
    {
      to: '/tasks',
      title: 'Task Manager',
      description: 'Add, view, and manage your tasks.',
    },
    {
      to: '/coin-flip',
      title: 'Coin Flipper',
      description: 'Flip a coin and see heads or tails.',
    },
    {
      to: '/dice',
      title: 'Rolling Dice',
      description: 'Roll dice and see the result.',
    },
    {
      to: '/qr-code',
      title: 'QR Code Generator',
      description: 'Generate a QR code from text.',
    },
    {
      to: '/random-quote',
      title: 'Random Quote',
      description: 'Show a random quote each time.',
    },
    {
      to: '/tic-tac-toe',
      title: 'Tic Tac Toe',
      description: 'Play a simple tic-tac-toe game.',
    },
    {
      to: '/todo',
      title: 'Todo List',
      description: 'Create and view a todo list.',
    },
    {
      to: '/adjustable-button',
      title: 'Adjustable Button',
      description: 'Grow and shrink a button interactively.',
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Select a card to open that mini app page.</p>
      </div>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="card">
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <span className="card-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
//tic tac toe game 3x3 grid
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }   
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],    
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  function handleAddTodo() {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue])
      setInputValue('')
    }
  }

  return (
    <div className='todoApp'>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

function AdjustableSizedButton() {
  const [size, setSize] = useState(100)
  
  function handleIncreaseSize() {
    setSize(size + 10)
  }
  function handleDecreaseSize()
  {
    setSize(size - 10)
  }
  

  return (
    <>
    <h1 className='adjustable-size-title'>Boom</h1>
    <button onClick={handleIncreaseSize}>
      Click to increase size
    </button><button className='decreasesize' onClick={handleDecreaseSize}>
        Click to decrease size
      </button></>

  )
} 

function checkboxForTodo(todo) {
  return (
    <label>
      <input type="checkbox" />
      {todo}
    </label>
  )
}




export default App
