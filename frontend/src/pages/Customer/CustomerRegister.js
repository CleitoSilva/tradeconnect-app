import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig"; // Use axios for better error handling
import "../../styles/Forms.css";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/customers/register", formData);
      console.log("Response from server:", response.data);

      if (response.data.userId) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate(`/customer/login`), 2000);
      } else {
        throw new Error("Registration successful, but user ID is missing.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Customer Registration</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/customer/login">Login here</a>
      </p>
    </div>
  );
};

export default CustomerRegister;
