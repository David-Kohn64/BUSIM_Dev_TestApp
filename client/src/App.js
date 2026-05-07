import { useState, useEffect, useRef } from 'react'

function App() {
  const wsRef = useRef(null)
  const [counter, setCounter] = useState(0)
  const numbers = [1, 2, 3, 10, 20, 30, -999]
  const [displayIndex, setDisplayIndex] = useState(0)

  // Group 2, 2 constants
  const [display2Val, incrementDisplay2] = useState(0)
  const intervalRef = useRef(null)
  const holdTimeoutRef = useRef(null)
  const [randomCounter, setRandom] = useState(0)
  const [increment, setIncrement] = useState(0)

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
    else if (message.type === "increment"){
      setIncrement(message.value)
    }
  }

  }, [])

  // Increments every 1000 ms
  useEffect(() => {
  intervalRef.current = setInterval(() => {
    incrementDisplay2(c => c + 1)
  }, 1000)
  return () => clearInterval(intervalRef.current)
  }, [])

  // When button is held, 5s timer starts
  const holdStop = () => {
    holdTimeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      console.log("Stopped auto increment")
    }, 5000)
  }

  // Reset when button is released
  const holdRelease = () => {
    clearTimeout(holdTimeoutRef.current)
  }

  return (
  <div>
    <h1>Counter: {counter}</h1>
    <button onMouseDown={() => wsRef.current.send('start')} onMouseUp={() => wsRef.current.send('stop')}>Hold me!</button>
    <button onClick={() => wsRef.current.send('up') || setCounter(c => c + 1)}>Increment</button>
    <button onClick={() => wsRef.current.send('reset') || setCounter(0)}>Reset</button>
    <div id="display">{numbers[displayIndex]}</div>
    <button onClick={() => setDisplayIndex((prev) => (prev + 1) % numbers.length)}>Rotate Number</button>

    <div id = "display2">{display2Val}</div>
    <button onMouseDown={holdStop} onMouseUp={holdRelease}>Hold 5s to Stop</button>

    <h1>Random: {randomCounter}</h1>
    <button onClick={() => wsRef.current.send('random')}>Press me.</button>

    <h1>Increment: {increment}</h1>
    <button onClick={() => wsRef.current.send('increment')}>Press me.</button>
  </div>
  )
}

export default App;
