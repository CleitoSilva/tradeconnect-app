import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get("/professionals/availability", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Fetched Availability:", response.data); // Debugging log
  
        // Ensure availability is not empty
        if (response.data.length === 0) {
          setAvailability([
            { day: "Monday", start: "09:00", end: "17:00" },
            { day: "Tuesday", start: "09:00", end: "17:00" },
            { day: "Wednesday", start: "09:00", end: "17:00" },
            { day: "Thursday", start: "09:00", end: "17:00" },
            { day: "Friday", start: "09:00", end: "17:00" },
          ]);
        } else {
          setAvailability(response.data);
        }
      } catch (err) {
        console.error("Error fetching availability:", err); // Debugging log
        setError("Failed to fetch availability data.");
      }
    };
  
    fetchAvailability();
  }, []);
  

  const handleChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/professionals/availability", { availability }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess("Availability updated successfully.");
    } catch (err) {
      setError("Failed to update availability.");
    }
  };

  return (
    <div className="availability-container">
      <h2>Manage Availability</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        {availability.map((slot, index) => (
          <div key={index}>
            <input type="text" value={slot.day} readOnly />
            <input type="time" value={slot.start} onChange={(e) => handleChange(index, "start", e.target.value)} />
            <input type="time" value={slot.end} onChange={(e) => handleChange(index, "end", e.target.value)} />
          </div>
        ))}
        <button type="submit">Update Availability</button>
      </form>
    </div>
  );
};

export default Availability;
