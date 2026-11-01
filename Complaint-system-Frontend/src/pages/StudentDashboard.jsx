import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Card from "../components/Card"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"



function StudentDashboard() {
  const [description, setDescription] = useState("")
  const [complaints, setComplaints] = useState([])

  const studentId = localStorage.getItem("studentId")

  useEffect(() => {
    loadComplaints()
    // eslint-disable-next-line
  }, [])

  const loadComplaints = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/complaints/student/${studentId}`
    )
    setComplaints(res.data)
  }

  const submitComplaint = async () => {
    await axios.post(
      `http://localhost:8080/api/complaints/submit/${studentId}`,
      { description }
    )
    setDescription("")
    loadComplaints()
    toast.success("complaint Register successfully")
  }
  const deleteComplaint = async (complaintId) => {
    const confirm = window.confirm("Are you sure you want to delete this complaint?")
    if (!confirm) return

    try {
      await axios.delete(
        `http://localhost:8080/api/complaints/delete/${complaintId}/student/${studentId}`
      )
      loadComplaints()
      toast.success("Complaint deleted")
    } catch (err) {
      console.error(err)
      toast.error("Delete failed. Check  permission.")
    }
  }



  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <>
      <Navbar title="Student Dashboard" onLogout={logout} />

      <div className="pt-28 min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100">



        {/* Submit Complaint */}
        <Card>
          <h3 className="text-xl font-semibold mb-3">
            📝 Submit Complaint
          </h3>

          <textarea
            className="
          w-full p-3 rounded-lg border
          focus:ring-2 focus:ring-blue-400
          outline-none transition
        "
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe your issue clearly..."
          />

          <button
            onClick={submitComplaint}
            className="
          mt-4 bg-blue-600 text-white
          px-6 py-2 rounded-full
          hover:bg-blue-700
          transition-all duration-300
        "
          >
            Submit
          </button>
        </Card>

        {/* Complaints */}
        <h3 className="text-xl font-bold mt-8 mb-4">
          📋 My Complaints
        </h3>

        {complaints.map(c => (
          <Card key={c.id}>
            <p className="font-semibold text-lg mb-2">
              {c.description}
            </p>

            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Dept: <b>{c.department}</b>
              </span>
              <p className="text-sm text-gray-600 mt-1">
                <b>Severity Score :</b>{" "}
              <span className={`
                font-semibold
                ${c.severityScore >= 8 && "text-red-600"}
                ${c.severityScore >= 5 && c.severityScore < 8 && "text-yellow-600"}
                ${c.severityScore < 5 && "text-green-600"}
                `}>
                {c.severityScore}
              </span>
              </p>

              <span className={`
                px-3 py-1 rounded-full text-white text-xs
                ${c.priority === "High" && "bg-red-500"}
                ${c.priority === "Medium" && "bg-yellow-500"}
                ${c.priority === "Low" && "bg-green-500"}
          `}>
                {c.priority}
              </span>


            </div>

            {/* <div className="mt-3">
              <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${c.status === "Resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"}
          `}>
                {c.status}
              </span>
            </div> */}
            <div className="mt-3 flex justify-between items-center">
              <span
                className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${c.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"}
    `}
              >
                {c.status}
              </span>

              {c.status !== "Resolved" && (
                <button
                  onClick={() => deleteComplaint(c.id)}
                  className="
                      text-red-600 text-sm font-semibold
                      hover:underline hover:text-red-700
                      transition
                    "
                >
                  Delete
                </button>
              )}
            </div>

          </Card>
        ))}

      </div>
    </>

  )
}

export default StudentDashboard
