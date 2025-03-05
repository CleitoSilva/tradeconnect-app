import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const ProfessionalLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/professionals/login", credentials);
      localStorage.setItem("token", response.data.token);
      navigate("/professional/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="form-container">
      <h2>Professional Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/professional/register">Register</a></p>
    </div>
  );
};

export default ProfessionalLogin;
