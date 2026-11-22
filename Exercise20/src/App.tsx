import { useEffect, useRef, useState, type FormEvent } from 'react'
import './App.css'

type Task = {
  id: number
  text: string
  completed: boolean
}

type View = 'todo' | 'timer'

const initialTasks: Task[] = [
  { id: 1, text: 'hey whatsapp', completed: false },
  { id: 2, text: 'how are you doing', completed: true },
  { id: 3, text: 'This is cool right ?', completed: false },
]

function App() {
  const [view, setView] = useState<View>('todo')
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [minutes, setMinutes] = useState('25')
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const secondsRef = useRef(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const intervalId = window.setInterval(() => {
      const nextSecond = Math.max(0, secondsRef.current - 1)
      secondsRef.current = nextSecond
      setSecondsLeft(nextSecond)
      if (nextSecond === 0) setIsRunning(false)
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = newTask.trim()
    if (!text) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text, completed: false },
    ])
    setNewTask('')
  }

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const removeTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const updateMinutes = (value: string) => {
    setMinutes(value)
    const parsedMinutes = Number(value)
    if (!isRunning && parsedMinutes >= 1 && parsedMinutes <= 180) {
      const newDuration = parsedMinutes * 60
      secondsRef.current = newDuration
      setSecondsLeft(newDuration)
    }
  }

  const resetTimer = () => {
    setIsRunning(false)
    const parsedMinutes = Number(minutes)
    const duration = Number.isFinite(parsedMinutes)
      ? Math.min(180, Math.max(1, parsedMinutes))
      : 25
    secondsRef.current = duration * 60
    setMinutes(String(duration))
    setSecondsLeft(secondsRef.current)
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="page-heading">
        <div className="brand-mark" aria-hidden="true">✦</div>
        <p className="eyebrow">A LITTLE MORE FOCUS</p>
        <h1>Make today count.</h1>
        <p className="intro">Small steps, one task at a time.</p>
      </header>

      <section className="workspace" aria-label="Productivity tools">
        <nav className="tabs" aria-label="Choose a tool">
          <button
            type="button"
            className={`tab${view === 'todo' ? ' active' : ''}`}
            aria-pressed={view === 'todo'}
            onClick={() => setView('todo')}
          >
            <span className="tab-icon" aria-hidden="true">☑</span>
            To-do list
          </button>
          <button
            type="button"
            className={`tab${view === 'timer' ? ' active' : ''}`}
            aria-pressed={view === 'timer'}
            onClick={() => setView('timer')}
          >
            <span className="tab-icon" aria-hidden="true">◷</span>
            Study timer
          </button>
        </nav>

        {view === 'todo' ? (
          <section className="card todo-card" aria-labelledby="todo-title">
            <div className="card-heading">
              <div>
                <p className="section-label">YOUR SPACE</p>
                <h2 id="todo-title">My Todo List</h2>
                <p className="card-subtitle">A clear mind starts with a clear list.</p>
              </div>
              <div className="task-count" aria-label={`${completedCount} of ${tasks.length} tasks complete`}>
                <span>{String(completedCount).padStart(2, '0')}</span>
                <span className="count-divider">/</span>
                <span className="count-total">{String(tasks.length).padStart(2, '0')}</span>
              </div>
            </div>

            <form className="add-task-form" onSubmit={addTask}>
              <label className="visually-hidden" htmlFor="new-task">Add a task</label>
              <input
                id="new-task"
                type="text"
                placeholder="What needs to get done?"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
              />
              <button type="submit" className="add-button">
                <span aria-hidden="true">+</span> Add
              </button>
            </form>

            <ul className="task-list">
              {tasks.map((task) => (
                <li className={`task-row${task.completed ? ' completed' : ''}`} key={task.id}>
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="custom-checkbox" aria-hidden="true">
                      {task.completed && <span>✓</span>}
                    </span>
                    <span className="task-text">{task.text}</span>
                  </label>
                  <button
                    type="button"
                    className="delete-button"
                    aria-label={`Delete ${task.text}`}
                    onClick={() => removeTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
              {tasks.length === 0 && (
                <li className="empty-state">Your list is clear. Add a task to get started.</li>
              )}
            </ul>

            <footer className="list-footer">
              <span><span className="status-dot" /> YOU’VE GOT THIS</span>
              <span>{tasks.length - completedCount} left to do</span>
            </footer>
          </section>
        ) : (
          <section className="card timer-card" aria-labelledby="timer-title">
            <div className="card-heading timer-heading">
              <div>
                <p className="section-label">DEEP WORK SESSION</p>
                <h2 id="timer-title">Study Timer</h2>
                <p className="card-subtitle">Make space for your best focus.</p>
              </div>
              <div className="timer-sparkle" aria-hidden="true">✳</div>
            </div>

            <div className="timer-display" role="timer" aria-label={`${formattedTime} remaining`}>
              <span>{formattedTime.slice(0, 2)}</span>
              <span className="timer-colon">:</span>
              <span>{formattedTime.slice(3)}</span>
            </div>
            <p className="timer-caption">{isRunning ? 'FOCUS IN PROGRESS' : 'READY WHEN YOU ARE'}</p>

            <div className="timer-settings">
              <label htmlFor="timer-minutes">Session length</label>
              <div className="minutes-input">
                <input
                  id="timer-minutes"
                  type="number"
                  min="1"
                  max="180"
                  value={minutes}
                  disabled={isRunning}
                  onChange={(event) => updateMinutes(event.target.value)}
                />
                <span>minutes</span>
              </div>
            </div>

            <div className="timer-actions">
              <button
                type="button"
                className="start-button"
                onClick={() => setIsRunning((running) => !running)}
                disabled={secondsLeft === 0}
              >
                <span aria-hidden="true">{isRunning ? 'Ⅱ' : '▶'}</span>
                {isRunning ? 'Pause' : 'Start focus'}
              </button>
              <button type="button" className="reset-button" onClick={resetTimer}>
                Reset
              </button>
            </div>
            <p className="timer-note">Take a breath. You’re doing great.</p>
          </section>
        )}
      </section>

      <footer className="page-footer">
        <span>MADE FOR YOUR MOMENT OF FOCUS</span>
        <span className="footer-flower" aria-hidden="true">✳</span>
      </footer>
    </main>
  )
}

export default App
