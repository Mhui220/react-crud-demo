import { useParams } from "react-router-dom"
import UserForm from "./UserForm"
import { useState, useEffect } from "react"
import { getUserDetails } from "../api/userApi"
import type { User } from "../types/User"

interface Props {
  addUser: (user: Omit<User,"id">) => void
  updateUser: (id: string, user: User) => void
}

export default function AddEditPage({ addUser, updateUser }: Props) {
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)

    const isEdit = !!id

    useEffect(() => {
        if (!id) return

        const fetchUser = async () => {
            const data = await getUserDetails(id)
            setUser(data)
        }

        fetchUser()
    }, [id])

    return (
        <div className="d-flex flex-column align-items-center">
            <h2>{isEdit ? "Edit User" : "Add User"}</h2>

            <div className="w-100 px-4">
                <UserForm addUser={addUser} updateUser={updateUser} editingUser={user} />
            </div>
            
        </div>
    )
}