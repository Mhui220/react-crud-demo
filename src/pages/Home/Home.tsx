import { useState } from "react"
import type { User } from "../../types/User"
import UserList from "../../components/UserList"
import UserForm from "../../components/UserForm"
import "./Home.css"
import Modal from "../../components/Modal"
import { useUsers } from "../../hooks/useUsers"
import Pagination from "../../components/Pagination"

export default function Home() {
  const { users, addUser, updateUser, deleteUser } = useUsers()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Pagination
  const [page, setPage] = useState(1)
  const pageSize = 5
  const start = (page - 1) * pageSize
  const paginatedUsers = users.slice(start, start + pageSize)
  const totalPages = Math.ceil(users.length / pageSize)

  return (
    <div className="content-container">
      <h1>User CRUD Demo</h1>
      <UserForm addUser={addUser} updateUser={updateUser} editingUser={editingUser} />
      <UserList users={paginatedUsers} setEditingUser={setEditingUser} setDeleteId={setDeleteId} />
      {users.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}

      <Modal
        show={deleteId !== null}
        title="Confirm Delete"
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) {
            deleteUser(deleteId)
          }
          setDeleteId(null)
        }}
        confirmText="Confirm"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  )
}