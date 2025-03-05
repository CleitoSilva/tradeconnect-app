import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const RequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ No token found in localStorage");
          return;
        }
    
        const selectedTechnicianId = localStorage.getItem("selectedTechnicianId");
        if (!selectedTechnicianId) {
          console.error("❌ No selected technician found in localStorage");
          return;
        }
    
        console.log(`📌 Fetching requests for Technician ID: ${selectedTechnicianId}`);
    
        const response = await axios.get(`/requests/professional/${selectedTechnicianId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("✅ Requests fetched:", response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch requests:", error.response?.data || error.message);
    
        if (error.response?.status === 404) {
          setError("No requests found for this technician.");
        } else {
          setError("Failed to fetch requests. Please try again.");
        }
      }
    };
    
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }
  
      await axios.put(
        `/requests/${id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: "Accepted" } : req
        )
      );
  
      // ✅ Save request state in localStorage
      localStorage.setItem("lastRequestId", id);
      localStorage.setItem("lastRequestStatus", "Accepted");
  
      navigate("/professional/check-in-out", { state: { requestId: id } });
    } catch (err) {
      setError("Failed to accept the request.");
    }
  };
  

  const handleDecline = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      await axios.put(
        `/requests/${id}/decline`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
    } catch (err) {
      setError("Failed to decline the request.");
    }
  };

  return (
    <div className="requests-container">
      <h2>Manage Requests</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {requests.length > 0 ? (
          requests.map((req) => (
            <li key={req._id} className="request-card">
              <p><strong>Service:</strong> {req.category}</p>
              <p><strong>Location:</strong> {req.location?.lat}, {req.location?.lng}</p>
              <p><strong>Date:</strong> {new Date(req.dateTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {req.status}</p>

              {req.status === "Pending" && (
                <>
                  <button onClick={() => handleAccept(req._id)}>Accept</button>
                  <button onClick={() => handleDecline(req._id)}>Decline</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No pending requests.</p>
        )}
      </ul>
    </div>
  );
};

export default RequestsManagement;
