import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const { isAuth, user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
