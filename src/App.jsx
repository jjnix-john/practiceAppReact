import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {

        <>
          <div className="task-manager">
            <h2>Task Manager</h2>
            <p>Welcome to the Task Manager Application!</p>
            <div className="task-input">
              <input type="text" placeholder="Enter a new task" />
              <button>Add Task</button>
            </div>

            <div className="task-list">
              <h3>Your Tasks:</h3>
              <ul>
                <li>Sample Task 1</li>
                <li>Sample Task 2</li>
              </ul>
            </div>
          </div>
          
          <div className="counter-app">
            <h1>Vite + React</h1>
            <div className="logos">
              <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank" rel="noreferrer">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h2>Count is: {count}</h2>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>

              </button>
              <button onClick={() => setCount((count) => count - 1)}>

              </button>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </div>
          </>

      }
    </>
  )
}

export default App
