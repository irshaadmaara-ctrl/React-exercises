export interface User {
  id: number
  name: string
  email: string
}

interface UserListProps {
  users: User[]
}

function UserList({ users }: UserListProps) {
  return (
    <section>
      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </section>
  )
}

export default UserList
