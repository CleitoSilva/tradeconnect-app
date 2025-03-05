import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css";

const ProblemDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};  

  const [problemDescription, setProblemDescription] = useState("");
  const [urgency, setUrgency] = useState("low"); // Default value
  const [dateTime, setDateTime] = useState("");  // Default empty

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problemDescription || !dateTime) {
      alert("Please enter problem details and select a date/time.");
      return;
    }

    navigate("/customer/technician-selection", { 
      state: { category, problemDescription, urgency, dateTime } 
    });
  };

  return (
    <div className="form-container">
      <h2>Describe Your Problem</h2>
      <p>Service Category: <strong>{category}</strong></p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe the issue in detail..."
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          required
        />

        <div>
          <label>Urgency:</label>
          <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label>Preferred Date & Time:</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default ProblemDetail;
