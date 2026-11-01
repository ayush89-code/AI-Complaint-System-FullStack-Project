import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Card from "../components/Card"
import Button from "../components/Button"
import StatusBadge from "../components/StatusBadge"
import { useNavigate } from "react-router-dom"
import CountUp from "react-countup"

function AdminDashboard() {
  const [sortOrder, setSortOrder] = useState("HIGH_TO_LOW")
  const [complaints, setComplaints] = useState([])
  const [filter, setFilter] = useState("ALL")
  const navigate = useNavigate()

  useEffect(() => {
    loadComplaints()
  }, [])

  const loadComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/complaints/admin/all"
      )
      setComplaints(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:8080/api/complaints/admin/update-status/${id}?status=${status}`
    )
    loadComplaints()
  }

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  const filteredComplaints = complaints
    .filter(c => {
      if (filter === "Pending") return c.status === "Pending"
      if (filter === "Resolved") return c.status === "Resolved"
      if (filter === "High Severity") return c.severityScore >= 9
      return true
    })
    .sort((a, b) => {
      if (sortOrder === "HIGH_TO_LOW") {
        return b.severityScore - a.severityScore
      } else {
        return a.severityScore - b.severityScore
      }
    })


  return (
    <>
      <Navbar title="Admin Dashboard" onLogout={logout} />

      <div className="pt-28 px-6 min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100">

        {/* ===== SUMMARY ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <Card>
            <h4 className="text-gray-500">Total Complaints</h4>
            <p className="text-3xl font-bold text-indigo-700">
              <CountUp end={complaints.length} duration={1} />
            </p>
          </Card>

          <Card>
            <h4 className="text-gray-500">Pending</h4>
            <p className="text-3xl font-bold text-yellow-600">
              <CountUp
                end={complaints.filter(c => c.status === "Pending").length}
                duration={1}
              />
            </p>
          </Card>

          <Card>
            <h4 className="text-gray-500">Resolved</h4>
            <p className="text-3xl font-bold text-green-600">
              <CountUp
                end={complaints.filter(c => c.status === "Resolved").length}
                duration={1}
              />
            </p>
          </Card>

        </div>

        {/* ===== FILTERS ===== */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm font-semibold text-gray-600">
            Sort by Severity:
          </span>

          <button
            onClick={() =>
              setSortOrder(prev =>
                prev === "HIGH_TO_LOW" ? "LOW_TO_HIGH" : "HIGH_TO_LOW"
              )
            }
            className="px-4 py-2 rounded-full text-sm font-semibold bg-white shadow hover:bg-indigo-100 transition"
          >
            {sortOrder === "HIGH_TO_LOW"
              ? "High → Low"
              : "Low → High"}
          </button>
        </div>


        {/* ===== COMPLAINT LIST ===== */}
        {filteredComplaints.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No complaints found
          </p>
        ) : (
          filteredComplaints.map(c => (
            <Card
              key={c.id}
              className={`relative ${c.severityScore >= 80
                  ? "border-2 border-red-500 shadow-red-300"
                  : ""
                }`}
            >
              {/* URGENT BADGE */}
              {c.severityScore >= 9 && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  URGENT
                </span>
              )}

              <p className="font-semibold text-lg mb-2">
                {c.description}
              </p>

              <div className="text-sm text-gray-600 space-y-1">
                <p><b>Department (AI):</b> {c.department}</p>
                <p><b>Priority (AI):</b> {c.priority}</p>

                {/* SEVERITY BAR */}
                <div className="mt-3">
                  <p className="text-sm font-medium">
                    Severity Score: <b>{c.severityScore}</b>
                  </p>

                  <div className="w-full h-2 bg-gray-200 rounded mt-1 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${c.severityScore >= 7
                          ? "bg-red-500"
                          : c.severityScore >= 4
                            ? "bg-yellow-400"
                            : "bg-green-500"
                        }`}
                      style={{ width: `${c.severityScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <StatusBadge value={c.status} />

                {c.status === "Pending" && (
                  <div className="flex gap-2">
                    <Button
                      text="Resolve"
                      type="success"
                      onClick={() => updateStatus(c.id, "Resolved")}
                    />
                    <Button
                      text="Reject"
                      type="danger"
                      onClick={() => updateStatus(c.id, "Rejected")}
                    />
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  )
}

export default AdminDashboard
