import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const register = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields")
      return
    }

    try {
      await axios.post(
        "http://localhost:8080/api/auth/student/register",
        { name, email, password }
      )

      toast.success("Registration successful")
      navigate("/")
    } catch (err) {
      toast.error("Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 animate-fadeIn">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Student Registration
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Create your grievance account
        </p>

        <input
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition transform shadow-lg"
        >
          Register
        </button>

        <p className="text-center text-gray-300 mt-5 text-sm">
          Already registered?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-400 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  )
}

export default Register
