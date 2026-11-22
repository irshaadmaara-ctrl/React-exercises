import { useState } from 'react'

function App() {
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)

  const resetBoth = () => {
    setCountA(0)
    setCountB(0)
  }

  return (
    <main>
      <h1>Double Counter</h1>
      <section>
        <h2>Counter A: {countA}</h2>
        <button
          type="button"
          onClick={() => setCountA((value) => Math.max(0, value - 1))}
          disabled={countA === 0}
        >
          - A
        </button>
        <button type="button" onClick={() => setCountA((value) => value + 1)}>
          + A
        </button>
      </section>
      <section>
        <h2>Counter B: {countB}</h2>
        <button
          type="button"
          onClick={() => setCountB((value) => Math.max(0, value - 1))}
          disabled={countB === 0}
        >
          - B
        </button>
        <button type="button" onClick={() => setCountB((value) => value + 1)}>
          + B
        </button>
      </section>
      <button type="button" onClick={resetBoth}>
        Reset Both
      </button>
    </main>
  )
}

export default App
