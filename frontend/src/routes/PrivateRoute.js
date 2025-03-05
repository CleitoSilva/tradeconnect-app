import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Correct import

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/customer/login" replace />;
};

export default PrivateRoute;
