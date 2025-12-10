// src/components/auth/protectedroute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontext.jsx";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Mientras está cargando (leyendo localStorage)
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si NO está autenticado, lo mando a /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestro el contenido
  return children;
}

export default ProtectedRoute;
