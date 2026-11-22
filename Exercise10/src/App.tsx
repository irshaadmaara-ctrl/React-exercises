import UserList, { type User } from './UserList.tsx'

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

function App() {
  return (
    <main>
      <UserList users={users} />
    </main>
  )
}

export default App
