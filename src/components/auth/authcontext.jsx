// src/components/auth/authcontext.jsx
import { createContext, useContext, useEffect, useState } from "react";

// 1) Crear el contexto
const AuthContext = createContext();

// 2) Crear el Provider (envolverá a toda la app)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);          // guarda el usuario
  const [loading, setLoading] = useState(true);    // mientras lee localStorage

  // 3) Al iniciar la app, leer localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 4) Función para login simulado
  function login(username) {
    const userData = { username }; // podrías agregar más datos
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  // 5) Función para logout
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value = {
    user,
    isAuthenticated: !!user, // true si hay usuario, false si no
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 6) Hook para usar el contexto más fácil
export function useAuth() {
  return useContext(AuthContext);
}

