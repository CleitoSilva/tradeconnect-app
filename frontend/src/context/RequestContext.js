import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "../api/axiosConfig";
import AuthContext from "./AuthContext";

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

  // Stable fetchRequests function using useCallback
  const fetchRequests = useCallback(async () => {
    if (!user) return;
    try {
      const response = await axios.get(`/requests/${user.role}/${user.id}`);
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  }, [user]);

  // Fetch requests when user logs in
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Add a new request
  const addRequest = async (requestData) => {
    try {
      const response = await axios.post("/requests", requestData);
      setRequests([...requests, response.data]);
      return { success: true };
    } catch (error) {
      return { success: false, message: "Failed to create request" };
    }
  };

  // Update request status
  const updateRequest = async (requestId, status) => {
    try {
      await axios.put(`/requests/${requestId}`, { status });
      setRequests(requests.map(req => req._id === requestId ? { ...req, status } : req));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Failed to update request" };
    }
  };

  return (
    <RequestContext.Provider value={{ requests, fetchRequests, addRequest, updateRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export default RequestContext;
