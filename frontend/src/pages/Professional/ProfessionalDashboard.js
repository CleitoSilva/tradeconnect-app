import { useNavigate } from "react-router-dom";
import "./Professional.css";

const ProfessionalDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Professional Dashboard</h2>
      <ul>
        <li><button onClick={() => navigate("/professional/edit-profile")}>Edit Profile</button></li>
        <li><button onClick={() => navigate("/professional/availability")}>Set Availability</button></li>
        <li><button onClick={() => navigate("/professional/requests")}>Manage Requests</button></li>
        <li><button onClick={() => navigate("/professional/reviews")}>View Customer Reviews</button></li>
      </ul>
    </div>
  );
};

export default ProfessionalDashboard;
