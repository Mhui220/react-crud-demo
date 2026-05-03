import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import Counter from "./pages/Exercise/Count"
import AddEditPage from "./components/user/AddEditPage"
import Login from "./pages/Login/Login"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "./App.css"

function ProtectedLayout({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  return (
    <>
      <nav className="p-2 border-bottom d-flex align-items-center justify-content-between">
        <div className="text-light">Employee Portal</div>
        <button
          className="btn btn-link text-light py-0"
          onClick={() => {
            onLogout()
            toast.success("Logged out successfully", { theme: "colored", })
          }}
        >
          Logout
        </button>
      </nav>
      <div className="m-4 main-content">{children}</div>
    </>
  )
}


export default function App() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("token"));

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <Router>
      <Routes>
        {token === null && <Route path="/login" element={<Login onLogin={(t) => { sessionStorage.setItem("token", t); setToken(t); }} />} />}
        {token && (
          <>
            <Route path="/" element={<ProtectedLayout onLogout={handleLogout}><Home /></ProtectedLayout>} />
            <Route path="/exercise" element={<ProtectedLayout onLogout={handleLogout}><Counter /></ProtectedLayout>} />
            <Route path="/users/add" element={<ProtectedLayout onLogout={handleLogout}><AddEditPage /></ProtectedLayout>} />
            <Route path="/users/edit/:id" element={<ProtectedLayout onLogout={handleLogout}><AddEditPage /></ProtectedLayout>} />
          </>

        )}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
      </Routes>

      <ToastContainer />
    </Router>
  )
}