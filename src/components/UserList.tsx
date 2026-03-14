import { useState } from "react"
import type { User } from "../types/User"
import { useNavigate } from "react-router-dom"

interface Props {
  users: User[]
  setDeleteId: (id: string) => void
}

export default function UserList({ users, setDeleteId }: Props) {
  const [search, setSearch] = useState("")
  const [sortAsc, setSortAsc] = useState(true)
  const toggleSort = () => {
    setSortAsc(prev => !prev)
  }
  
  const filteredUsers = users
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))

  const navigate = useNavigate()

  return (
    <div className="mt-2 px-4  w-100">
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-2 px-2 py-1 border rounded w-100"
      />

      <table className="table-auto border-collapse border border-gray-300 w-100">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-1"
                onClick={toggleSort} style={{cursor:"pointer"}}>
                Name
                <i className={`ms-1 bi ${sortAsc ? "bi-sort-up" : "bi-sort-down"}`}></i>
              </th>
            <th className="border border-gray-300 px-2 py-1">Email</th>
            <th className="border border-gray-300 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1">{user.name}</td>
              <td className="border border-gray-300 px-2 py-1">{user.email}</td>
              <td className="border border-gray-300 px-2 py-1">
                <button
                  className="mx-1 px-2 py-1 rounded"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="mx-1 px-2 py-1 rounded"
                  onClick={() => setDeleteId(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-2">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  )
}