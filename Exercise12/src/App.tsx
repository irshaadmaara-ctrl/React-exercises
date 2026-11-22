import { useState } from 'react'

function App() {
  const [count, setCount] = useState(5)

  return (
    <main>
      <h1>Count: {count}</h1>
      <button
        type="button"
        onClick={() => setCount((value) => Math.max(0, value - 1))}
        disabled={count === 0}
      >
        Decrement
      </button>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increment
      </button>
    </main>
  )
}

export default App
