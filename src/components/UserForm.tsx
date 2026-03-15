import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { type User } from "../types/User"
import { useNavigate } from "react-router-dom"
import { statusOptions } from "../constants/statusOptions"

interface FormValues {
  name: string
  email: string
  phone: string
  statusId: number
}

interface Props {
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: string, user: User) => void
  editingUser: User | null
}

export default function UserForm({ addUser, updateUser, editingUser }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<FormValues>({mode: "onChange"})

  const navigate = useNavigate()

  useEffect(() => {
    if(editingUser){
      reset({ name: editingUser.name, email: editingUser.email, phone: editingUser.phone })
    } else {
      reset({ name: "", email: "", phone: "" })
    }
  }, [editingUser, reset])

  const onSubmit = async (data: FormValues) => {
    if(editingUser){
      updateUser(editingUser.id, { ...editingUser, ...data })
    } else {
      addUser({ ...data, statusId: 1, createdAt: new Date().toISOString()})
    }
    reset()
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-3">
          <span className="me-2">Name</span>
        </div>
        <div className="col-9">
          <input
          id="name"
          className="col-9 form-control my-2"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          />
          {errors.name && <div className="err-msg">{errors.name.message}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <span className="me-2">Email</span>
        </div>
        <div className="col-9">
          <input
          id="email"
          className="form-control my-2"
          placeholder="Email"
          {...register("email", { 
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
          })}
          />
          {errors.email && <div className="err-msg">{errors.email.message}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <span className="me-2">Phone</span>
        </div>
        <div className="col-9">
          <input
          id="phone"
          className="form-control my-2"
          placeholder="Phone Number"
          {...register("phone", { 
            required: "Phone is required",
            pattern: { value: /^[0-9]+$/, message: "Invalid phone number" }
          })}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
          }}
          />
          {errors.phone && <div className="err-msg">{errors.phone.message}</div>}
        </div>
      </div>

      {editingUser && (
        <div className="row">
          <div className="col-3">
            <span className="me-2">Status</span>
          </div>
          <div className="col-9">
            <select className="form-control my-2" id="status" {...register("statusId", { valueAsNumber: true })}>
              {statusOptions.map((status: {id: number, desc: string}) => (
                <option key={status.id} value={status.id}>
                  {status.desc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      <div className="text-end">
        <button className="btn btn-light mt-2 me-2" type="button" onClick={() => navigate("/")}>Cancel</button>
        <button className="btn btn-primary mt-2" type="submit" disabled={!isValid}>{editingUser ? "Update" : "Add"} User</button>
      </div>
      
    </form>
  )
}