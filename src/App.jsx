import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Main from "./components/layout/main";

import HomePage from "./pages/home/homepage";
import ProductsPage from "./pages/products/productspage";
import ReviewsPage from "./pages/reviews/reviewspage";
import CartPanel from "./components/cart/cartpanel.jsx";

import ProductDetail from "./pages/products/productdetail.jsx";
import CheckoutPage from "./components/cart/checkoutpage.jsx";

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Main title="Inicio">
              <HomePage />
            </Main>
          }
        />

        <Route
          path="/productos"
          element={
            <Main title="Productos">
              <ProductsPage />
            </Main>
          }
        />

        <Route
          path="/producto/:id"
          element={
            <Main title="Producto">
              <ProductDetail />
            </Main>
          }
        />

        <Route
          path="/reseñas"
          element={
            <Main title="Reseñas">
              <ReviewsPage />
            </Main>
          }
        />

        <Route
          path="/carrito"
          element={
            <Main title="Carrito">
              <CartPanel />
            </Main>
          }
        />

        <Route
          path="/checkout"
          element={
            <Main title="Checkout">
              <CheckoutPage />
            </Main>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
