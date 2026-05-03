import { useState } from "react"
import UserList from "../../components/user/UserList"
import "./Home.css"
import Modal from "../../components/user/Modal"
import { useUsers } from "../../hooks/useUsers"
import Pagination from "../../components/user/Pagination"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const { users, loading, deleteUser } = useUsers()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Pagination
  const [page, setPage] = useState(1)
  const pageSize = 5
  const start = (page - 1) * pageSize
  const paginatedUsers = users.slice(start, start + pageSize)
  const totalPages = Math.ceil(users.length / pageSize)

  const navigate = useNavigate()

  return (
    <div className="content-container">
      <h2>User Listing</h2>

      <button className="btn btn-light align-self-end" onClick={() => navigate("/users/add")}>
        Add User
      </button>

      <UserList users={paginatedUsers} loading={loading} setDeleteId={setDeleteId} />
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