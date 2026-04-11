import { useNavigate, useParams } from "react-router-dom"
import UserForm from "./UserForm"
import { useState, useEffect } from "react"
import { createUser, editUser, getUserDetails } from "../../api/userApi"
import type { User } from "../../types/User"
import { toast } from "react-toastify"

interface FormValues {
  id?: string
  name: string
  email: string
  phone: string
  salary: string
  statusId: number
}

export default function AddEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
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

    const handleSubmit = async (formData: FormValues) => {
        try {
            if (isEdit && id) {
                const updatedUser: User = { ...user!, ...formData }
                await editUser(id, updatedUser)
                toast.success("User updated!", {theme: "colored",})
            } else {
                const newUser: Omit<User, "id" | "createdAt"> = { ...formData }
                await createUser(newUser)
                toast.success("User created!", {theme: "colored",})
            }

            navigate("/")
        } catch {
            toast.error("Something went wrong", {theme: "colored",})
        }
    }

    if (isEdit && !user) {
        return <div>Loading...</div>
    }

    return (

        <div className="card shadow">
            <div className="card-body">
                <h2>{isEdit ? "Edit User" : "Add User"}</h2>

                <hr />

                <div className="w-100">
                    <UserForm onSubmit={handleSubmit} editingUser={user} />
                </div>
            </div>
        </div>
    )
}