import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Customer.css";

const CustomerDashboard = () => {
  useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome, Customer!</h2>
      <div className="dashboard-links">
        <button onClick={() => navigate("/customer/service-selection")}>Request a Service</button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
