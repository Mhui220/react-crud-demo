import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { type User } from "../../types/User"
import { useNavigate } from "react-router-dom"
import { statusOptions } from "../../constants/statusOptions"

// interface FormValues {
//   id?: string
//   name: string
//   email: string
//   phone: string
//   salary: string
//   statusId: number
// }

interface Props {

  onSubmit: (data: User, id?: string) => void
  editingUser: User | null
}

export default function UserForm({ onSubmit, editingUser }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<User>({ mode: "onChange" })

  const navigate = useNavigate()

  useEffect(() => {
    if (editingUser) {
      reset({ 
        id: editingUser.id, 
        name: editingUser.name,
        email: editingUser.email,
        salary: editingUser.salary,
        phone: editingUser.phone,
        statusId: editingUser.statusId })
    } else {
      reset({ 
        name: "", 
        email: "",
        phone: "",
        salary: '',
        statusId: 1 })
    }
  }, [editingUser, reset])

  const onSubmitForm = (data: User) => {
    onSubmit(data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
      <div className="row py-2">
        <div className="col-3">
          <span className="me-2">Name</span>
        </div>
        <div className="col-9">
          <input
            id="name"
            className="col-9 form-control"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <div className="err-msg">{errors.name.message}</div>}
        </div>
      </div>

      <div className="row py-2">
        <div className="col-3">
          <span className="me-2">Email</span>
        </div>
        <div className="col-9">
          <input
            id="email"
            className="form-control"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
            })}
          />
          {errors.email && <div className="err-msg">{errors.email.message}</div>}
        </div>
      </div>

      <div className="row py-2">
        <div className="col-3">
          <span className="me-2">Phone</span>
        </div>
        <div className="col-9">
          <input
            id="phone"
            className="form-control"
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

      <div className="row py-2">
        <div className="col-3">
          <span className="me-2">Salary (RM)</span>
        </div>
        <div className="col-9">
          <input
            type="number"
            min="0"
            step="0.01"
            id="salary"
            className="form-control"
            placeholder="Salary"
            {...register("salary", {
              required: "Salary is required",
              valueAsNumber: true,
              validate: value =>
              /^\d+(\.\d{1,2})?$/.test(value.toString()) || "Max 2 decimal places"
            })}
          />
          {errors.salary && <div className="err-msg">{errors.salary.message}</div>}
        </div>
      </div>

      {editingUser && (
        <div className="row py-2">
          <div className="col-3">
            <span className="me-2">Status</span>
          </div>
          <div className="col-9">
            <select className="form-control" id="status" {...register("statusId", { valueAsNumber: true })}>
              {statusOptions.map((status: { id: number, desc: string }) => (
                <option key={status.id} value={status.id}>
                  {status.desc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <hr />
      <div className="text-end mt-4">
        <button className="btn btn-light mt-2 me-2" type="button" onClick={() => navigate("/")}>Cancel</button>
        <button className="btn btn-primary mt-2" type="submit" disabled={!isValid}>{editingUser ? "Update" : "Add"} User</button>
      </div>

    </form>
  )
}