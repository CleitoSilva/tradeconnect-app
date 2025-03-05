import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/professional/reviews", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReviews(response.data);
      } catch (err) {
        setError("Failed to load reviews.");
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      <h2>Customer Reviews</h2>
      {error && <p className="error-message">{error}</p>}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review._id} className="review-card">
              <p><strong>Customer:</strong> {review.customerName}</p>
              <p><strong>Rating:</strong> {"⭐".repeat(review.rating)}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerReviews;
