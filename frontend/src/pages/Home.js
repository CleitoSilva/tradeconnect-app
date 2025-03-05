import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Add styles for the landing page

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to TradeConnect</h1>
      <p>Connecting customers with skilled professionals.</p>
      <div className="home-links">
        <Link to="/customer/login" className="btn">Customer Login</Link>
        <Link to="/professional/login" className="btn">Professional Login</Link>
        <Link to="/admin/login" className="btn">Admin Login</Link>
      </div>
    </div>
  );
};

export default Home;
