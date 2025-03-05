import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ Correct
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TradeConnect</Link>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            {user.role === "Customer" && <Link to="/customer/dashboard">Dashboard</Link>}
            {user.role === "Professional" && <Link to="/professional/dashboard">Dashboard</Link>}
            {user.role === "Admin" && <Link to="/admin/dashboard">Dashboard</Link>}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/customer/login">Customer</Link>
            <Link to="/professional/login">Professional</Link>
            <Link to="/admin/login">Admin</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
