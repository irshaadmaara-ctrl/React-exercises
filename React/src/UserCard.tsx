type UserCardProps = {
  name: string
  email: string
}

function UserCard({ name, email }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

export default UserCard