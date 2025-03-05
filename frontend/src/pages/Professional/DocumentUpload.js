import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const DocumentUpload = () => {
  const { id } = useParams(); // Capture userId from URL
  const navigate = useNavigate(); // Hook for navigation
  const [files, setFiles] = useState({ idProof: null, certificate: null });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // Track successful upload

  useEffect(() => {
    console.log("Current User ID from URL:", id);
  }, [id]);

  useEffect(() => {
    if (success) {
      // Redirect to loginn after 5 seconds
      const timer = setTimeout(() => {
        navigate("/professional/login"); 
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [success, navigate]);

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idProof", files.idProof);
    formData.append("certificate", files.certificate);
    formData.append("userId", id); // Attach userId

    try {
      await axios.post("/professionals/upload-documents", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "multipart/form-data" },
      });

      setMessage("Documents uploaded successfully! Redirecting to login in 5 seconds...");
      setSuccess(true); // Trigger redirection effect
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      setMessage("Error uploading documents.");
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Verification Documents</h2>
      <p>Professional ID: {id}</p>
      {message && <p className={success ? "success-message" : "error-message"}>{message}</p>}
      <form onSubmit={handleUpload}>
        <label>ID Proof</label>
        <input type="file" name="idProof" onChange={handleFileChange} required />
        <label>Certification</label>
        <input type="file" name="certificate" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUpload;
