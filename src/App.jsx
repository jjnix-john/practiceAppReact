import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import './App.css'
import Counter from './Counter.jsx'
import Calculator from './Calculator.jsx'
import TaskManager from './TaskManager.jsx'
import CoinFlipper from './Coinflipper.jsx'
import RollingDice from './RollingDice.jsx'
import QRCodeGenerator from './QRCodeGenerator.jsx'
import RandomQuote from './RandomQoute.jsx'
import AIChatbot from './AIChatbot.jsx'
import Wordle from './Wordle.jsx'
import CrosswordPuzzle from './CrosswordPuzzle.jsx'
import Login from './Login.jsx'
import Pacman from './Pacman.jsx'
import { auth } from './auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
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
            path="ai-chat"
            element={
              <Page title="AI Chatbot">
                <AIChatbot />
              </Page>
            }
          />
          <Route
            path="wordle"
            element={
              <Page title="Wordle">
                <Wordle />
              </Page>
            }
          />
          <Route
            path="crossword"
            element={
              <Page title="Crossword Puzzle">
                <CrosswordPuzzle />
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
          <Route
            path="pacman"
            element={
              <Page title="Pacman">
                <Pacman />
              </Page>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function RequireAuth({ children }) {
  const location = useLocation()

  if (!auth.isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function Layout() {
  const navigate = useNavigate()
  const username = auth.getUsername()

  function handleLogout() {
    auth.logout()
    navigate('/login', { replace: true })
  }

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
          {username ? (
            <div className="nav-actions">
              <span className="nav-greeting">Hi, {username}</span>
              <button className="button secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
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
  const slug = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`page page--${slug}`}>
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
      bg: 'linear-gradient(135deg, #ffeadb 0%, #ffd7d9 100%)',
    },
    {
      to: '/calculator',
      title: 'Calculator',
      description: 'A simple calculator for basic operations.',
      bg: 'linear-gradient(135deg, #c1ede8 0%, #a2d9ff 100%)',
    },
    {
      to: '/tasks',
      title: 'Task Manager',
      description: 'Add, view, and manage your tasks.',
      bg: 'linear-gradient(135deg, #f3f7d9 0%, #d3f2ff 100%)',
    },
    {
      to: '/coin-flip',
      title: 'Coin Flipper',
      description: 'Flip a coin and see heads or tails.',
      bg: 'linear-gradient(135deg, #fff6d6 0%, #ffe2a1 100%)',
    },
    {
      to: '/dice',
      title: 'Rolling Dice',
      description: 'Roll dice and see the result.',
      bg: 'linear-gradient(135deg, #ddf1ff 0%, #b7dfff 100%)',
    },
    {
      to: '/qr-code',
      title: 'QR Code Generator',
      description: 'Generate a QR code from text.',
      bg: 'linear-gradient(135deg, #e7d7ff 0%, #ffccf6 100%)',
    },
    {
      to: '/random-quote',
      title: 'Random Quote',
      description: 'Show a random quote each time.',
      bg: 'linear-gradient(135deg, #d6f7ff 0%, #cce4ff 100%)',
    },
    {
      to: '/ai-chat',
      title: 'AI Chatbot',
      description: 'Chat with an AI using the OpenRouter API.',
      bg: 'linear-gradient(135deg, #f5f0ff 0%, #e8e3ff 100%)',
    },
    {
      to: '/wordle',
      title: 'Wordle',
      description: 'Guess the hidden 5-letter word in 6 tries.',
      bg: 'linear-gradient(135deg, #e8fbe8 0%, #c7f0d9 100%)',
    },
    {
      to: '/crossword',
      title: 'Crossword Puzzle',
      description: 'Fill in the grid using crossword clues.',
      bg: 'linear-gradient(135deg, #fff4d6 0%, #ffe8a1 100%)',
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
    {
      to: '/pacman',
      title: 'Pacman',
      description: 'Play the classic Pacman game.',
      bg: 'linear-gradient(135deg, #ffff00 0%, #ffcc00 100%)',
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
          <Link key={card.to} to={card.to} className="card" style={{ '--card-bg': card.bg }}>
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
