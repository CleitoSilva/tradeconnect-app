import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./Admin.css";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({ 
  name: "",
  phone: "",
  email: "",
  password: "",
  secretCode: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (admin.secretCode !== "333444") {
      setError("Invalid secret code.");
      return;
    }
    try {
      await axios.post("/admin/register", admin);
      setSuccess("Admin registered successfully. Redirecting to Admin login...");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="secretCode" placeholder="Secret Code" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      <p>Already have an account? <Link to="/admin/login">Login</Link></p>
    </div>
  );
};

export default AdminRegister;
