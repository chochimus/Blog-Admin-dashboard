import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
