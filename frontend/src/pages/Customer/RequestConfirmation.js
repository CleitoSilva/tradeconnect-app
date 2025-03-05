import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./Customer.css";

const RequestConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, problemDescription, selectedTechnician, requestId } = location.state || {};

  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  const [technicianName, setTechnicianName] = useState("Fetching...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requestId) {
      console.error("❌ Request ID is missing!");
      return;
    }

    // Function to check request status
    const checkStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/requests/${requestId}`);
        const { status, technician } = response.data;

        // Enable payment only when the request is completed
        if (status === "Completed") {
          setIsPaymentEnabled(true);
        }

        // Set technician's name if available
        if (technician && technician.name) {
          setTechnicianName(technician.name);
        }

        setLoading(false); // Request fetched, stop loading
      } catch (error) {
        console.error("❌ Error checking request status:", error);
      }
    };

    // Fetch initial status
    checkStatus();

    // Poll for updates every 5 seconds
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [requestId]);

  const handleConfirm = () => {
    if (!isPaymentEnabled) return;
    navigate("/customer/payment-simulation", {
      state: { category, problemDescription, selectedTechnician, requestId },
    });
  };

  return (
    <div className="form-container">
      <h2>Confirm Your Request</h2>
      {loading ? (
        <p>Loading request details...</p>
      ) : (
        <>
          <p><strong>Service:</strong> {category}</p>
          <p><strong>Problem:</strong> {problemDescription}</p>
          <p><strong>Technician:</strong> {technicianName}</p>
          <button onClick={handleConfirm} disabled={!isPaymentEnabled}>
            {isPaymentEnabled ? "Proceed to Payment" : "Waiting for Technician"}
          </button>
        </>
      )}
    </div>
  );
};

export default RequestConfirmation;
