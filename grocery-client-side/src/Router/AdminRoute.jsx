import Loader from "../components/Loader";
import UseAuth from "../Hooks/UseAuth";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = UseAuth();
  const location = useLocation();

  if (loading) return <Loader/>;

  if (user && (role === "admin" || role === "seller")) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AdminRoute;

