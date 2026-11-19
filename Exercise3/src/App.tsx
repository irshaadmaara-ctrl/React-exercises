import UserCard from './UserCard'
import './App.css'

const users = [
  { name: 'Irshaad', role: 'Super Admin', age: 20 },
  { name: 'Ahmad', role: 'Student', age: 14 },
  { name: 'Mariya', role: 'Student', age: 17 },
]

function App() {
  return (
    <main className="user-directory">
      <div>
        {users.map((user) => (
          <UserCard
            key={user.name}
            name={user.name}
            role={user.role}
            age={user.age}
          />
        ))}
      </div>
    </main>
  )
}

export default App
