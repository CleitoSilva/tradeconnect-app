import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Correct

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
