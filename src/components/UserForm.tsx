import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { User } from "../types/User"
import { useNavigate } from "react-router-dom"

interface Props {
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: string, user: User) => void
  editingUser: User | null
}

export default function UserForm({ addUser, updateUser, editingUser }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<{name:string,email:string}>({mode: "onChange"})

  const navigate = useNavigate()

  useEffect(() => {
    if(editingUser){
      reset({ name: editingUser.name, email: editingUser.email })
    } else {
      reset({ name: "", email: "" })
    }
  }, [editingUser, reset])

  const onSubmit = async (data: {name:string,email:string}) => {
    if(editingUser){
      updateUser(editingUser.id, { ...editingUser, ...data })
    } else {
      addUser(data)
    }
    reset()
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          className="my-2"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <div className="err-msg">{errors.name.message}</div>}
      </div>

      <div>
        <input
          className="my-2"
          placeholder="Email"
          {...register("email", { 
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
          })}
        />
        {errors.email && <div className="err-msg">{errors.email.message}</div>}
      </div>

      <button className="mt-2" type="submit" disabled={!isValid}>{editingUser ? "Update" : "Add"} User</button>
    </form>
  )
}