import { NavLink } from "react-router-dom";
import "./layout.css";
import { useCart } from "../cart/cartcontext.jsx";

export default function Sidebar() {
  const { cartCount } = useCart();

  return (
    <aside className="sidebar">
      <div className="brand">
        <NavLink to="/" className="brand-link" aria-label="Ir al inicio">
          <img src="/assets/logo.png" alt="Logo de la tienda" />
        </NavLink>
        <h1>Tienda de Stickers</h1>
      </div>

      <nav>
        <NavLink to="/" end className={({isActive}) => "side-link" + (isActive ? " active" : "")}>Inicio</NavLink>
        <NavLink to="/productos" className={({isActive}) => "side-link" + (isActive ? " active" : "")}>Productos</NavLink>
        <NavLink to="/reseñas" className={({isActive}) => "side-link" + (isActive ? " active" : "")}>Reseñas</NavLink>

        {/* Carrito visible con badge grande */}
<NavLink
  to="/carrito"
  className={({isActive}) => "side-link cart-link" + (isActive ? " active" : "")}
>
  <span className="cart-label">
    <span className="cart-emoji" aria-hidden>🛒</span>
    <span>Carrito</span>
  </span>
  <span className="badge badge-cart">{cartCount}</span>
</NavLink>

      </nav>

      {/* Pie simple (sacamos el contador duplicado) */}
      <div className="mini-footer">
        © 2025 Tienda. Todos los derechos reservados.
      </div>
    </aside>
  );
}
