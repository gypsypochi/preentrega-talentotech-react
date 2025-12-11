import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authcontext.jsx";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // si NO está logueado → al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // si la ruta exige admin y no lo es → a inicio
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
