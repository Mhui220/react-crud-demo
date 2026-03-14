import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home/Home"
import Counter from "./pages/Exercise/Count"

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/exercise">Exercise</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise" element={<Counter />} />
      </Routes>
    </Router>
  )
}