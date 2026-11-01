import { useState } from "react"

function Navbar({ title, onLogout }) {
  const [open, setOpen] = useState(false)

  const name = localStorage.getItem("name") || "User"
  const role = localStorage.getItem("role") || "STUDENT"

  return (
    <div
      className="
        fixed top-0 left-0 right-0
        z-50
        flex justify-between items-center
        px-8 py-4
        bg-white shadow-md
      "
    >
      <h2 className="text-xl font-bold text-indigo-700">{title}</h2>

      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="
            w-10 h-10 rounded-full bg-indigo-600 text-white
            flex items-center justify-center cursor-pointer
            hover:bg-indigo-700 transition
          "
        >
          {name.charAt(0).toUpperCase()}
        </div>

        {open && (
          <div
            className="
              absolute right-0 mt-3 w-52
              bg-white rounded-xl shadow-2xl
              border overflow-hidden
              z-50
            "
          >
            <div className="px-4 py-3 border-b bg-gray-50">
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>

            <button
              onClick={onLogout}
              className="
                w-full text-left px-4 py-2
                hover:bg-red-50 text-red-600
                transition
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
