import { useState } from "react"
import type { User } from "../../types/User"
import UserList from "../../components/UserList"
import UserForm from "../../components/UserForm"
import "./Home.css"

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)

  type CreateUserDto = Omit<User, "id">
  const addUser = (user: CreateUserDto) => {
    const newUser = { ...user, id: Date.now() }
    setUsers([...users, newUser])
  }

  const updateUser = (user: User) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)))
    setEditingUser(null)
  }

  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    <div className="content-container">
      <h1>User CRUD Demo</h1>
      <UserForm addUser={addUser} updateUser={updateUser} editingUser={editingUser} />
      <UserList users={users} setEditingUser={setEditingUser} deleteUser={deleteUser} />
    </div>
  )
}