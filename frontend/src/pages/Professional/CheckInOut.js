import { useState } from "react";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const CheckInOut = ({ requestId }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = async () => {
    await axios.put(`/requests/${requestId}/check-in`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  
    setIsCheckedIn(true);
  
    // ✅ Save check-in state
    localStorage.setItem("lastRequestStatus", "Checked-In");
  };
  
  const handleCheckOut = async () => {
    await axios.put(`/requests/${requestId}/check-out`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  
    setIsCheckedIn(false);
  
    // ✅ Clear session tracking after checkout
    localStorage.removeItem("lastRequestStatus");
    localStorage.removeItem("lastRequestId");
  };
  

  return (
    <div className="check-container">
      <button onClick={handleCheckIn} disabled={isCheckedIn}>Check In</button>
      <button onClick={handleCheckOut} disabled={!isCheckedIn}>Check Out</button>
    </div>
  );
};

export default CheckInOut;
