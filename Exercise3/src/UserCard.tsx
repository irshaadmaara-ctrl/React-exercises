type UserCardProps = {
  name: string
  role: string
  age?: number
}

function UserCard({ name, role, age }: UserCardProps) {
  return (
    <article className="user-card">
      <h1>Hello , {name}</h1>
      <h2>
        Your role is : {role} your age is : {age}
      </h2>
    </article>
  )
}

export default UserCard
