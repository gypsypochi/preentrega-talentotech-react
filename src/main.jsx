import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { CartProvider } from "./components/cart/cartcontext.jsx";
import { AuthProvider } from "./components/auth/authcontext.jsx"; // 👈 NUEVO

import "./styles/styles.css";
import "./components/layout/layout.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>           {/* ⬅ ahora toda la app tiene AuthContext */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
