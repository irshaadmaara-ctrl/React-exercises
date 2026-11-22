import { useState, type FormEvent } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  if (isLoggedIn) {
    return (
      <main>
        <h1>Welcome, {username}!</h1>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </main>
    )
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default App
