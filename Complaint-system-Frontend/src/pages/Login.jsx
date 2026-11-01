import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("STUDENT")
  const navigate = useNavigate()

  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields")
      return
    }

    try {
      const url =
        role === "STUDENT"
          ? "http://localhost:8080/api/auth/student/login"
          : "http://localhost:8080/api/auth/admin/login"

      const payload =
        role === "STUDENT"
          ? { email, password }
          : { username: email, password }

      const res = await axios.post(url, payload)

      localStorage.setItem("role", role)

      if (role === "STUDENT") {
        localStorage.setItem("studentId", res.data.id)
        localStorage.setItem("name", res.data.name)
        navigate("/student")
      } else {
        localStorage.setItem("name", "Admin")
        navigate("/admin")
      }
    } catch {
      toast.error("Invalid credentials")

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
      <div
        className="
          w-[420px]
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          rounded-3xl
          shadow-2xl
          p-8
          animate-fadeIn
        "
      >
        {/* Header */}
        <div className="mb-8 text-center">
          {/* Role Avatar */}
          <div className="flex justify-center mb-4">
            <div
              className={`
                w-20 h-20 rounded-full
                flex items-center justify-center
                text-white text-3xl font-bold
                shadow-lg transition-all duration-300
                ${role === "ADMIN"
                  ? "bg-gradient-to-br from-red-500 to-orange-500"
                  : "bg-gradient-to-br from-indigo-500 to-blue-500"}
    `}
            >
              {role === "ADMIN" ? "A" : "S"}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-1">
            College Complaint System
          </h1>

          <p className="text-gray-300 text-center mb-6">
            {role === "ADMIN"
              ? "Administrator Control Panel"
              : "Student Complaint Portal"}
          </p>

        </div>

        {/* Role Selector */}
        <div className="mb-5">
          <label className="text-sm text-gray-300 mb-1 block">
            Login as
          </label>

          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="
    w-full mb-4 px-4 py-3 rounded-lg
    bg-white/10 text-white
    border border-white/20
    focus:outline-none focus:ring-2 focus:ring-indigo-500
  "
          >
            <option
              value="STUDENT"
              className="text-gray-900 bg-white"
            >
              Student Login
            </option>

            <option
              value="ADMIN"
              className="text-gray-900 bg-white"
            >
              Admininstrative
            </option>
          </select>

        </div>

        {/* Email / Username */}
        <div className="mb-4">
          <label className="text-xs text-gray-300 mb-1 block">
            {role === "ADMIN" ? "Admin Username" : "Student Email"}
          </label>
          <input
            className="
              w-full px-4 py-3 rounded-xl
              bg-white/10 text-white
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition
            "
            placeholder={role === "ADMIN" ? "Enter username" : "Enter email"}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-xs text-gray-300 mb-1 block">
            Password
          </label>
          <input
            type="password"
            className="
              w-full px-4 py-3 rounded-xl
              bg-white/10 text-white
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition
            "
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="
            w-full py-3 rounded-xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-semibold tracking-wide
            hover:brightness-110 hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-200
            shadow-lg
          "
        >
          Sign In
        </button>

        {/* Register */}
        {role === "STUDENT" && (
          <p className="text-center text-gray-300 mt-6 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="
                text-indigo-400 font-semibold
                cursor-pointer hover:underline
              "
            >
              Register here
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login
