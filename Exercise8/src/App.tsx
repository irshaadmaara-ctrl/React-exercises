import { useEffect, useState, type ChangeEvent } from 'react'

function App() {
  const [secondsInput, setSecondsInput] = useState('0')
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const duration = Math.max(0, Math.floor(Number(secondsInput) || 0))

  useEffect(() => {
    if (!isRunning) return

    const timeoutId = window.setTimeout(() => {
      if (remainingSeconds <= 1) {
        setRemainingSeconds(0)
        setIsRunning(false)
      } else {
        setRemainingSeconds(remainingSeconds - 1)
      }
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [isRunning, remainingSeconds])

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setSecondsInput(value)
    if (!isRunning) {
      setRemainingSeconds(Math.max(0, Math.floor(Number(value) || 0)))
    }
  }

  const handleStart = () => {
    if (remainingSeconds === 0) setRemainingSeconds(duration)
    setIsRunning(true)
  }

  const handleReset = () => {
    setIsRunning(false)
    setRemainingSeconds(duration)
  }

  return (
    <main>
      <h1>Countdown Timer</h1>
      <p>
        <label htmlFor="timer-seconds">Set Time (seconds): </label>
        <input
          id="timer-seconds"
          type="number"
          min="0"
          step="1"
          value={secondsInput}
          disabled={isRunning}
          onChange={handleTimeChange}
        />
      </p>
      <p>Time Left: {remainingSeconds} seconds</p>
      <button
        type="button"
        onClick={handleStart}
        disabled={isRunning || duration === 0}
      >
        Start
      </button>{' '}
      <button
        type="button"
        onClick={() => setIsRunning(false)}
        disabled={!isRunning}
      >
        Stop
      </button>{' '}
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </main>
  )
}

export default App
