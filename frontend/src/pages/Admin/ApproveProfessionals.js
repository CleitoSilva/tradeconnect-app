import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import "./Admin.css";

const ApproveProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get("/admin/pending-professionals", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        setProfessionals(response.data);
      } catch (err) {
        console.error("Error fetching professionals.");
        setError("Failed to load professionals.");
      }
    };
    fetchProfessionals();
  }, []);

  const approveProfessional = async (id) => {
    try {
      await axios.put(`/admin/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });

      setProfessionals(professionals.filter((pro) => pro._id !== id)); // Remove from UI after approval
      setSuccessMessage("Professional approved successfully!"); // Set success message

      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Approval failed.");
      setError("Approval failed. Try again.");
    }
  };

  return (
    <div className="approve-container">
      <h2>Pending Professionals</h2>

      {/* Display messages */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {professionals.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        <table className="professionals-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Experience</th>
              <th>Documents</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {professionals.map((pro) => (
              <tr key={pro._id}>
                <td>{pro.user?.name}</td>
                <td>{pro.user?.email}</td>
                <td>{pro.user?.phone}</td>
                <td>{pro.category}</td>
                <td>{pro.experience} years</td>
                <td className="document-links">
                  {pro.documents.map((doc, index) => (
                    <a key={index} href={`http://localhost:5000/${doc.path}`} target="_blank" rel="noopener noreferrer">
                      {doc.path.split("/").pop()}
                    </a>
                  ))}
                </td>
                <td>
                  <button onClick={() => approveProfessional(pro._id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveProfessionals;
