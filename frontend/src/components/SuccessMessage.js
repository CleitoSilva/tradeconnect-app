import React from "react";
import "./SuccessMessage.css";

const SuccessMessage = ({ message }) => {
  return message ? <div className="success-message">{message}</div> : null;
};

export default SuccessMessage;
