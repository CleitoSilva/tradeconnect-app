import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css";

const ReviewSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTechnician } = location.state || {};

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technicianId: selectedTechnician, rating, review }),
      });

      if (!response.ok) throw new Error("Failed to submit review.");
      setSuccessMessage("Review submitted successfully!");
      setTimeout(() => navigate("/customer/dashboard"), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Submit a Review</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
        
        <textarea placeholder="Write your review..." value={review} onChange={(e) => setReview(e.target.value)} required />
        
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewSubmission;
