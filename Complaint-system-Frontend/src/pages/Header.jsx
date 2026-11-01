import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ userType }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (userType === "student") {
            localStorage.removeItem("studentId");
        } else if (userType === "admin") {
            localStorage.removeItem("adminId");
        }
        navigate("/");
    };

    return (
        <header style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
            <h2>{userType === "student" ? "Student Dashboard" : "Admin Dashboard"}</h2>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
}

export default Header;
