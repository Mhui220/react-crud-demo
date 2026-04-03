import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home/Home"
import Counter from "./pages/Exercise/Count"
import AddEditPage from "./components/AddEditPage"
import { useUsers } from "./hooks/useUsers"

export default function App() {
  const { addUser, updateUser } = useUsers()
  
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/exercise">Exercise</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise" element={<Counter />} />

        <Route path="/users/add" element={<AddEditPage addUser={addUser} updateUser={updateUser} />} />
        <Route path="/users/edit/:id" element={<AddEditPage addUser={addUser} updateUser={updateUser} />} />
      </Routes>
    </Router>
  )
}