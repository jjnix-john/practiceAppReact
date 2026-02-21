import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import  Counter from './Counter.jsx'
import Calculator from './Calculator.jsx'
import TaskManager from './TaskManager.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <div><TaskManager /></div>

    <div>
      <h1>React Logo</h1>
      <img src={reactLogo} className="logo react" alt="React logo" />
    </div>
    

    <div className="BoxedApp">
      <h1>Count Button</h1> 
      <button disabled={count >= 6} onClick={() => setCount((count) => count + 1)}>
        Increment
        
      </button>
      <p>Count is: {count}</p>
    </div>
      
    
    <div className="BoxedApp">
      <h1>Tic Tac Toe Game</h1>
      <Board />
    </div>

    <div>
      <h1>Todo App</h1>
      <TodoApp />
    </div>
    
    <div>
      <h1>Adjustable Sized Button</h1>
      <AdjustableSizedButton />
    </div>

    <div>
      <h1>Checkbox for Todo</h1>
      {checkboxForTodo("Learn React")}
      {checkboxForTodo("Build a Todo App")}
    </div>

    
    <div>
      <Counter />
    </div>

    <div>
      <Calculator/>
    </div>
    
    
    </> 
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
