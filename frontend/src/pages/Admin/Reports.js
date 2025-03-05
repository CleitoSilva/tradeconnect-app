import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import "./Admin.css";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/admin/reports", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        setReports(response.data);
      } catch (err) {
        console.error("Error fetching reports.");
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="reports-container">
      <h2>Financial Reports</h2>
      {reports.length === 0 ? <p>No reports available.</p> : (
        reports.map((report, index) => (
          <div key={index} className="report-card">
            <p>{report.professionalName} - ${report.earnings}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Reports;
