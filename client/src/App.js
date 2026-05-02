import { useState, useEffect, useRef } from 'react'

function App() {
  const wsRef = useRef(null)
  const [counter, setCounter] = useState(0)
  const [randomCounter, setRandom] = useState(0)

  useEffect(() => {
  wsRef.current = new WebSocket('ws://localhost:3001')
  wsRef.current.onmessage = (m) => {
    let message = (JSON.parse(m.data))
    if (message.type === "counter"){
      setCounter(message.value)
    }
    else if (message.type === "random"){
      setRandom(message.value)
    }
  }

  }, [])

  return (
  <div>
    <h1>Counter: {counter}</h1>
    <button onMouseDown={() => wsRef.current.send('start')} onMouseUp={() => wsRef.current.send('stop')}>Hold me!</button>

    <h1>Random: {randomCounter}</h1>
    <button onClick={() => wsRef.current.send('random')}>Press me.</button>
  </div>
  )
}

export default App;
