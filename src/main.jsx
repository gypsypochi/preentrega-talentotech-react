import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { CartProvider } from "./components/cart/cartcontext.jsx";
import { AuthProvider } from "./components/auth/authcontext.jsx";
import { ProductsProvider } from "./components/products/productscontext.jsx";

// 👉 Bootstrap primero
import "bootstrap/dist/css/bootstrap.min.css";

// 👉 Tus estilos después (pueden sobreescribir Bootstrap)
import "./styles/styles.css";
import "./components/layout/layout.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
