import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";
// import useAuth from "../hooks/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles === allowedRoles ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
