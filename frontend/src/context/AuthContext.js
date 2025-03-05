import { createContext, useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      const response = await axios.post("/auth/login", { email, password, role });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);

        // 🚀 Check for saved session data
        const lastRequestStatus = localStorage.getItem("lastRequestStatus");
        const lastRequestId = localStorage.getItem("lastRequestId");

        if (user.role === "customer" && lastRequestStatus) {
          switch (lastRequestStatus) {
            case "Pending":
              return navigate("/customer/request-confirmation", { state: { requestId: lastRequestId } });
            case "Accepted":
              return navigate("/customer/request-confirmation", { state: { requestId: lastRequestId } });
            case "In Progress":
              return navigate("/customer/request-confirmation", { state: { requestId: lastRequestId } });
            case "Completed":
              return navigate("/customer/payment-simulation", { state: { requestId: lastRequestId } });
            default:
              break;
          }
        }

        if (user.role === "professional" && lastRequestId) {
          return navigate("/professional/manage-requests");
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("lastRequestStatus");
    localStorage.removeItem("lastRequestId");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
