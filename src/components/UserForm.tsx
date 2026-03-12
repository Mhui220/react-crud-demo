import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { User } from "../types/User"

interface Props {
  addUser: (user: Omit<User, "id">) => void
  updateUser: (user: User) => void
  editingUser: User | null
}

export default function UserForm({ addUser, updateUser, editingUser }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<{name:string,email:string}>({mode: "onChange"})

  useEffect(() => {
    if(editingUser){
      reset({ name: editingUser.name, email: editingUser.email })
    } else {
      reset({ name: "", email: "" })
    }
  }, [editingUser, reset])

  const onSubmit = (data: {name:string,email:string}) => {
    if(editingUser){
      updateUser({ ...editingUser, ...data })
    } else {
      addUser(data)
    }
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