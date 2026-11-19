import { useState } from 'react'
import './App.css'

function ToggleButton() {
  const [isOn, setIsOn] = useState(true)
  const label = isOn ? 'ON' : 'OFF'

  return (
    <section aria-labelledby="toggle-status">
      <h1 id="toggle-status" className="toggle-status" aria-live="polite">
        The button is {label}.
      </h1>
      <button
        type="button"
        className="toggle-button"
        aria-pressed={isOn}
        onClick={() => setIsOn((currentIsOn) => !currentIsOn)}
      >
        Turn {isOn ? 'OFF' : 'ON'}
      </button>
    </section>
  )
}

function App() {
  return (
    <main className="toggle-page">
      <ToggleButton />
    </main>
  )
}

export default App
