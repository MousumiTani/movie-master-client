// router/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
