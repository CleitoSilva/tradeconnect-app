import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Customer.css";

const PaymentSimulation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, selectedTechnician } = location.state || {}; // Removed problemDescription

  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = () => {
    setPaymentStatus("Processing...");
    setTimeout(() => {
      setPaymentStatus("Payment Successful!");
      navigate("/customer/review-submission", { state: { category, selectedTechnician } });
    }, 2000);
  };

  return (
    <div className="form-container">
      <h2>Payment Simulation</h2>
      <p>Total Amount: <strong>$50 (Service Fee)</strong></p>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentStatus && <p className="success-message">{paymentStatus}</p>}
    </div>
  );
};

export default PaymentSimulation;
