import { useState, useEffect, useRef } from 'react'

function App() {
  const wsRef = useRef(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
  wsRef.current = new WebSocket('ws://localhost:3001')
  wsRef.current.onmessage = (m) => {
    setCounter(m.data)
  }

  }, [])

  return (
  <div>
    <h1>Counter: {counter}</h1>
    <button onMouseDown={() => wsRef.current.send('start')} onMouseUp={() => wsRef.current.send('stop')}>Hold me!</button>
    <button onClick={() => wsRef.current.send('up') || setCounter(c => c + 1)}>Increment</button>
  </div>
  )
}

export default App;
