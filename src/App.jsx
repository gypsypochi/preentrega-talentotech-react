import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/layout/sidebar";
import Main from "./components/layout/main";

import HomePage from "./pages/home/homepage";
import ProductsPage from "./pages/products/productspage";
import ReviewsPage from "./pages/reviews/reviewspage";
import CartPanel from "./components/cart/cartpanel.jsx";
import ProductDetail from "./pages/products/productdetail.jsx";
import CheckoutPage from "./components/cart/checkoutpage.jsx";

// 🔐 Auth
import LoginPage from "./pages/login/loginpage.jsx";
import ProtectedRoute from "./components/auth/protectedroute.jsx";

function App() {
  return (
    <div className="app-shell">
      <Sidebar />

      <Routes>
        {/* Inicio */}
        <Route
          path="/"
          element={
            <Main title="Inicio">
              <HomePage />
            </Main>
          }
        />

        {/* Productos */}
        <Route
          path="/productos"
          element={
            <Main title="Productos">
              <ProductsPage />
            </Main>
          }
        />

        {/* Producto individual */}
        <Route
          path="/producto/:id"
          element={
            <Main title="Producto">
              <ProductDetail />
            </Main>
          }
        />

        {/* Reseñas */}
        <Route
          path="/reseñas"
          element={
            <Main title="Reseñas">
              <ReviewsPage />
            </Main>
          }
        />

        {/* Carrito (no protegida) */}
        <Route
          path="/carrito"
          element={
            <Main title="Carrito">
              <CartPanel />
            </Main>
          }
        />

        {/* 🔐 Checkout — protegida */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Main title="Checkout">
                <CheckoutPage />
              </Main>
            </ProtectedRoute>
          }
        />

        {/* 🔑 Login */}
        <Route
          path="/login"
          element={
            <Main title="Iniciar sesión">
              <LoginPage />
            </Main>
          }
        />

        {/* Redirección 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
