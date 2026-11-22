type Stat = {
  label: string
  value: string
  icon: string
}

type Course = {
  name: string
  progress: number
  next: string
  instructor: string
  progressColor: string
}

type Assignment = {
  title: string
  course: string
  due: string
  status: 'pending' | 'completed' | 'in-progress'
}

const stats: Stat[] = [
  { label: 'Average Grade', value: '88%', icon: '▥' },
  { label: 'Courses', value: '3', icon: '📚' },
  { label: 'Study Hours', value: '45h', icon: '⏰' },
  { label: 'Assignments', value: '12', icon: '✍️' },
]

const courses: Course[] = [
  {
    name: 'React Fundamentals',
    progress: 75,
    next: 'Next: Components & Props',
    instructor: 'Sarah Wilson',
    progressColor: 'bg-blue-500',
  },
  {
    name: 'JavaScript Advanced',
    progress: 45,
    next: 'Next: Async/Await',
    instructor: 'Mike Johnson',
    progressColor: 'bg-blue-500',
  },
  {
    name: 'UI/UX Design',
    progress: 90,
    next: 'Next: Color Theory',
    instructor: 'Emily Chen',
    progressColor: 'bg-blue-500',
  },
]

const assignments: Assignment[] = [
  {
    title: 'Build a Todo App',
    course: 'React Fundamentals',
    due: 'Due 2024-03-20',
    status: 'pending',
  },
  {
    title: 'API Integration',
    course: 'JavaScript Advanced',
    due: 'Due 2024-03-18',
    status: 'completed',
  },
  {
    title: 'Design System',
    course: 'UI/UX Design',
    due: 'Due 2024-03-25',
    status: 'in-progress',
  },
]

const statusStyles = {
  pending: 'bg-red-100 text-red-600',
  completed: 'bg-green-100 text-green-700',
  'in-progress': 'bg-yellow-100 text-yellow-700',
}

function App() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-8 font-sans text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1120px]">
        <header className="mb-6 flex h-[90px] items-center justify-between rounded-xl border border-slate-100 bg-white px-6 shadow-[0_5px_18px_rgba(15,23,42,0.12)] sm:px-6">
          <div>
            <h1 className="text-[20px] font-bold tracking-tight text-slate-900">
              Welcome back, Student!
            </h1>
            <p className="mt-1 text-[13px] text-slate-500">
              Here&apos;s what&apos;s happening with your courses today.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="relative text-[20px]"
            >
              🔔
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button
              type="button"
              aria-label="Student profile"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#a855c7] text-sm font-bold text-white"
            >
              S
            </button>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex h-[84px] items-center gap-4 rounded-xl border border-slate-100 bg-white px-5 shadow-[0_5px_18px_rgba(15,23,42,0.10)]"
            >
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-slate-50 text-[20px]">
                {stat.icon}
              </span>
              <div>
                <p className="text-[12px] text-slate-500">{stat.label}</p>
                <p className="text-[21px] font-bold leading-6 text-slate-900">
                  {stat.value}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_5px_18px_rgba(15,23,42,0.10)]">
            <h2 className="mb-5 text-[16px] font-bold text-slate-900">
              Course Progress
            </h2>
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.name}
                  className="rounded-lg bg-[#f7f8fb] px-5 py-4"
                >
                  <div className="mb-2 flex items-center justify-between text-[13px]">
                    <h3 className="font-bold text-slate-900">{course.name}</h3>
                    <span className="text-slate-500">{course.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full ${course.progressColor}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[12px] text-slate-500">
                    <span>{course.next}</span>
                    <span>{course.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.10)]">
              <h2 className="mb-4 text-[15px] font-bold text-slate-900">
                Upcoming Assignments
              </h2>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.title}
                    className="grid grid-cols-[1fr_auto] gap-x-3 text-[12px]"
                  >
                    <h3 className="text-[13px] font-bold text-slate-900">
                      {assignment.title}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${statusStyles[assignment.status]}`}
                    >
                      {assignment.status}
                    </span>
                    <p className="mt-1 text-slate-500">{assignment.course}</p>
                    <p className="mt-1 text-slate-500">{assignment.due}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.10)]">
              <h2 className="mb-4 text-[15px] font-bold text-slate-900">
                Announcements
              </h2>
              <div className="space-y-3">
                <div className="border-l-4 border-[#2f80ed] pl-3">
                  <h3 className="text-[13px] font-bold text-slate-900">
                    New Course Available
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Check out our new TypeScript course!
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">2 hours ago</p>
                </div>
                <div className="border-l-4 border-[#2f80ed] pl-3">
                  <h3 className="text-[13px] font-bold text-slate-900">
                    Maintenance Notice
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Platform updates scheduled for tonight
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">6 hours ago</p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
