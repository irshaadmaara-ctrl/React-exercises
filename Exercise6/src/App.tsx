import { useEffect, useState } from 'react'

function App() {
  const [name, setName] = useState('hamuuda')
  const [greeting, setGreeting] = useState('assalamu alaikum')

  useEffect(() => {
    const title = [greeting.trim(), name.trim()].filter(Boolean).join(', ')
    document.title = title || 'Exercise 6'
  }, [greeting, name])

  return (
    <main>
      <h1>Enter Your Name:</h1>
      <input
        aria-label="Your name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <h1>Choose a Greeting:</h1>
      <input
        aria-label="Greeting"
        type="text"
        value={greeting}
        onChange={(event) => setGreeting(event.target.value)}
      />
    </main>
  )
}

export default App
