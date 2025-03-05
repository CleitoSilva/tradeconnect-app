import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TradeConnect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
