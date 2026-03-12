import type { User } from "../types/User"

interface Props {
  users: User[]
  setEditingUser: (user: User) => void
  deleteUser: (id: number) => void
}

export default function UserList({ users, setEditingUser, deleteUser }: Props) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
          <button className="mx-2" onClick={() => setEditingUser(user)}>Edit</button>
          <button className="mx-2" onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}