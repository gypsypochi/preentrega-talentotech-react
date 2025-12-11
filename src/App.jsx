import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/layout/sidebar";
import Main from "./components/layout/main";

import HomePage from "./pages/home/homepage";
import ProductsPage from "./pages/products/productspage";
import ReviewsPage from "./pages/reviews/reviewspage";
import CartPanel from "./components/cart/cartpanel.jsx";
import ProductDetail from "./pages/products/productdetail.jsx";
import CheckoutPage from "./components/cart/checkoutpage.jsx";
import LoginPage from "./pages/login/loginpage.jsx";
import ProtectedRoute from "./components/auth/protectedroute.jsx";
import ProductAdminPage from "./pages/products/productadminpage.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
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

          {/* Admin productos */}
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute requireAdmin>
                <Main title="Administrar productos">
                  <ProductAdminPage />
                </Main>
              </ProtectedRoute>
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

          {/* Carrito */}
          <Route
            path="/carrito"
            element={
              <Main title="Carrito">
                <CartPanel />
              </Main>
            }
          />

          {/* Checkout */}
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

          {/* Login */}
          <Route
            path="/login"
            element={
              <Main title="Iniciar sesión">
                <LoginPage />
              </Main>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
