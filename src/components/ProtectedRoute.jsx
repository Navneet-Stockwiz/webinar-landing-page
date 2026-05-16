// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const hasAccess = sessionStorage.getItem("hasAccess");

  if (hasAccess === "true") {
    return children;
  } else {
    return <Navigate to="/pricing" replace />;
  }
};

export default ProtectedRoute;
