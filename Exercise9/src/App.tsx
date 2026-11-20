import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

const MIN_LOADING_TIME_MS = 700

type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  location: string | null
  public_repos: number
}

function isGitHubUser(value: unknown): value is GitHubUser {
  return (
    typeof value === 'object' &&
    value !== null &&
    'login' in value &&
    typeof value.login === 'string' &&
    'name' in value &&
    (typeof value.name === 'string' || value.name === null) &&
    'avatar_url' in value &&
    typeof value.avatar_url === 'string' &&
    'location' in value &&
    (typeof value.location === 'string' || value.location === null) &&
    'public_repos' in value &&
    typeof value.public_repos === 'number'
  )
}

function App() {
  const [username, setUsername] = useState('')
  const [searchRequest, setSearchRequest] = useState<{
    username: string
  } | null>(null)
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!searchRequest) {
      return
    }

    const url = `https://api.github.com/users/${encodeURIComponent(searchRequest.username)}`
    const controller = new AbortController()
    const requestStartedAt = Date.now()

    async function fetchUser() {
      try {
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No GitHub user was found with that username.')
          }
          throw new Error(`GitHub request failed (HTTP ${response.status}).`)
        }

        const data: unknown = await response.json()
        if (!isGitHubUser(data)) {
          throw new Error('GitHub returned an unexpected user profile.')
        }

        const remainingLoadingTime =
          MIN_LOADING_TIME_MS - (Date.now() - requestStartedAt)
        if (remainingLoadingTime > 0) {
          await new Promise<void>((resolve) =>
            window.setTimeout(resolve, remainingLoadingTime),
          )
        }

        if (controller.signal.aborted) {
          return
        }

        setUser(data)
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Could not load the GitHub user. Please try again.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchUser()

    return () => controller.abort()
  }, [searchRequest])

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedUsername = username.trim()
    if (!trimmedUsername) {
      setError('Please enter a GitHub username.')
      return
    }

    setUser(null)
    setError('')
    setIsLoading(true)
    setSearchRequest({ username: trimmedUsername })
  }

  return (
    <main>
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSearch}>
        <input
          aria-label="GitHub username"
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          Search
        </button>
      </form>

      {isLoading && <p role="status">Loading...</p>}
      {error && <p role="alert">{error}</p>}

      {user && (
        <section aria-label="GitHub user profile">
          <h2>{user.name || user.login}</h2>
          <img
            className="user-avatar"
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
          />
          <p>Location: {user.location || 'N/A'}</p>
          <p>Public Repos: {user.public_repos}</p>
        </section>
      )}
    </main>
  )
}

export default App
