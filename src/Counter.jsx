import { useState } from 'react'




function Counter() {
  const [count, setCount] = useState(0)

    const incrementCount = () => {
        setCount(count + 1)
    }

    const decrementCount = () => {
        setCount(count - 1)
    }   

    const resetCount = () => {
        setCount(0)
    }
    

  return (
    <div>
      <h1 className='counterTitle'>Counter</h1>
      <p className='counterValue'>Count: {count}</p>
      <button className='counterButton' onClick={incrementCount}>Increment</button>
      <button className='counterButton' onClick={decrementCount}>Decrement</button>
      <button className='counterButton' onClick={resetCount}>Reset</button>
    </div>
  )
}



export default Counter