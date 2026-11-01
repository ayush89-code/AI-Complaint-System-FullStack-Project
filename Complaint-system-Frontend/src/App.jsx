import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import StudentDashboard from "./pages/StudentDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route
        path="/student"
        element={<ProtectedRoute role="STUDENT">
          <StudentDashboard />
        </ProtectedRoute>} /><Route
        path="/admin"
        element={<ProtectedRoute role="ADMIN">
          <AdminDashboard />
        </ProtectedRoute>} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
