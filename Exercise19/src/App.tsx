import { useState, type FormEvent } from 'react'

type Task = {
  id: number
  text: string
  completed: boolean
}

const initialTasks: Task[] = [
  { id: 1, text: 'Waxqawad cashar aqrin ', completed: false },
  { id: 2, text: 'Waxqawadkashaqeen exercises ', completed: true },
  { id: 3, text: 'Waxqawad muraajaceen', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

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

  return (
    <div className="min-h-screen bg-[#ece9fa] font-sans text-slate-700">
      <main className="flex min-h-screen items-center justify-center px-4 py-8">
        <section
          className="w-full max-w-[462px] rounded-xl bg-white px-6 py-8 shadow-[0_3px_10px_rgba(32,28,58,0.12)] sm:px-8"
          aria-labelledby="todo-title"
        >
          <h1
            id="todo-title"
            className="mb-8 text-center text-[30px] font-extrabold tracking-tight text-slate-800"
          >
            My Todo List
          </h1>

          <form className="mb-6 flex gap-2" onSubmit={addTask}>
            <label className="sr-only" htmlFor="new-task">
              Add a new todo
            </label>
            <input
              id="new-task"
              type="text"
              placeholder="Add a new todo..."
              value={newTask}
              onChange={(event) => setNewTask(event.currentTarget.value)}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#8738e8] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#742bd0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Add
            </button>
          </form>

          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                className={`group flex min-h-[58px] items-center justify-between gap-3 rounded-lg px-3 ${
                  task.completed ? 'bg-[#f1f2f5]' : 'bg-[#f8f9fb]'
                }`}
                key={task.id}
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 shrink-0 accent-blue-500"
                  />
                  <span
                    className={`truncate text-sm ${
                      task.completed
                        ? 'text-slate-400 line-through'
                        : 'text-slate-700'
                    }`}
                  >
                    {task.text}
                  </span>
                </label>
                <button
                  type="button"
                  className={`shrink-0 rounded px-2 py-1 text-sm font-medium text-red-600 transition-opacity hover:text-red-700 focus-visible:opacity-100 ${
                    task.completed
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                  }`}
                  aria-label={`Delete ${task.text}`}
                  onClick={() => removeTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="rounded-lg bg-[#f8f9fb] px-4 py-5 text-center text-sm text-slate-500">
                Your list is clear. Add a task to get started.
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
