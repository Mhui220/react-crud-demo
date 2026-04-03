import { useEffect, useState } from "react"
import type { User } from "../types/User"
import { getUsers, createUser, editUser, removeUser } from "../api/userApi"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const maxRetries = 5;
      const retryDelay = 100; // 100ms between retries
      let attempt = 0;
      let data = null;

      while (attempt < maxRetries) {
        try {
          data = await getUsers();
          break; // success, exit loop
        } catch {
          attempt++;
          console.warn(`Attempt ${attempt} failed, retrying...`);
          await new Promise(res => setTimeout(res, retryDelay));
        }
      }

      if (data) {
        setUsers(data);
      } else {
        console.error("Failed to fetch users after retries");
      }

      setLoading(false)
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
    loading,
    addUser,
    updateUser,
    deleteUser
  }
}
