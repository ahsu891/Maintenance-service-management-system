import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";
// import useAuth from "../hooks/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const storedValue = localStorage.getItem("roles");
  if (storedValue) {
    return storedValue === allowedRoles ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
  if (auth) {
    return auth?.roles === allowedRoles ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;
