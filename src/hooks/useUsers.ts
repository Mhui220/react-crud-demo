import { useEffect, useState } from "react"
import type { User } from "../types/User"
import { getUsers, createUser, editUser, removeUser } from "../api/userApi"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch users", error)
      }
    }

    fetchUsers()
  }, [])

  const addUser = async (user: Omit<User, "id">) => {
    const newUser = await createUser(user)
    setUsers(prev => [...prev, newUser])
  }

  const updateUser = async (id: string, user: User) => {
    const updated = await editUser(id, user)

    setUsers(prev =>
      prev.map(u => (u.id === id ? updated : u))
    )
  }

  const deleteUser = async (id: string) => {
    await removeUser(id)

    setUsers(prev =>
      prev.filter(u => u.id !== id)
    )
  }

  return {
    users,
    addUser,
    updateUser,
    deleteUser
  }
}
