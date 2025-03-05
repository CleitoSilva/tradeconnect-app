import { Link } from "react-router-dom";
import "./Admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <nav>
        <Link to="/admin/approve-professionals">Approve Professionals</Link>
        <Link to="/admin/reports">View Reports</Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;
