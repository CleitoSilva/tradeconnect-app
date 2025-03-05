import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const ProfessionalRegister = () => {
  const [formData, setFormData] = useState({
    name: "", phone: "", category: "", experience: "", region: "", email: "", password: "", termsAccepted: false
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setFormData({
        ...formData,
        region: `${position.coords.latitude},${position.coords.longitude}`,
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the terms checkbox is checked
    if (!formData.termsAccepted) {
      setError("You must agree to our digital contract terms and service fees before registering.");
      return;
    }

    console.log("Submitting form data:", formData);
  
    try {
      const response = await axios.post("/professionals/register", formData);
      console.log("Response from server:", response.data);
  
      if (response.data.userId) {
        const uploadPath = `/professional/upload-docs/${response.data.userId}`;
        console.log("Navigating to:", uploadPath);
  
        setTimeout(() => navigate(uploadPath, { replace: true }), 500);
      } else {
        setError("Registration successful, but user ID is missing.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Professional Registration</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <select name="category" onChange={handleChange} required>
          <option value="">Select Service Category</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="LockSmith">LockSmith</option>
          <option value="Mason">Mason</option>
          <option value="Painter">Painter</option>
        </select>
        <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
        <button type="button" onClick={getLocation}>Get Current Location</button>
        <input type="text" name="region" value={formData.region} readOnly />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        <label>
          <input type="checkbox" name="termsAccepted" onChange={handleChange} required /> 
          By checking this box, you agree to our digital contract terms and service fees.
        </label>
        
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/professional/login">Login</a></p>
    </div>
  );
};

export default ProfessionalRegister;
