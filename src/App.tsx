import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import Counter from "./pages/Exercise/Count"
import AddEditPage from "./components/AddEditPage"
import Login from "./pages/Login/Login"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

function ProtectedLayout({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  return (
    <>
      <nav className="p-2 border-bottom mb-4">
        <div className="text-end">
          <button
            className="btn btn-link"
            onClick={() => {
              onLogout()
              toast.success("Logged out successfully", {theme: "colored",})
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="mx-4">{children}</div>
    </>
  )
}


export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Routes>
        {token === null && <Route path="/login" element={<Login onLogin={(t) => { localStorage.setItem("token", t); setToken(t); }} />} />}
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