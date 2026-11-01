import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, role }) {
  const storedRole = localStorage.getItem("role")

  if (!storedRole || storedRole !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
