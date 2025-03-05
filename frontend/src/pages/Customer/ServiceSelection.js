import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Customer.css";

const ServiceSelection = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return;
    navigate("/customer/problem-detail", { state: { category } });
  };

  return (
    <div className="form-container">
      <h2>Select a Service</h2>
      <form onSubmit={handleSubmit}>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">-- Select Service Category --</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Locksmith">Locksmith</option>
          <option value="Mason">Mason</option>
          <option value="Painter">Painter</option>
        </select>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default ServiceSelection;
