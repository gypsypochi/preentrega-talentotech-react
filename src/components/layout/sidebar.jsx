import { NavLink, useNavigate } from "react-router-dom";
import "./layout.css";
import { useCart } from "../cart/cartcontext.jsx";
import { useAuth } from "../auth/authcontext.jsx";

export default function Sidebar() {
  const { cartCount } = useCart();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <NavLink to="/" className="brand-link" aria-label="Ir al inicio">
          <img src="/assets/logo.png" alt="Logo de la tienda" />
        </NavLink>
        <h1>Tienda de Stickers</h1>
      </div>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "side-link" + (isActive ? " active" : "")
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) =>
            "side-link" + (isActive ? " active" : "")
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/reseñas"
          className={({ isActive }) =>
            "side-link" + (isActive ? " active" : "")
          }
        >
          Reseñas
        </NavLink>

        {/* Carrito */}
        <NavLink
          to="/carrito"
          className={({ isActive }) =>
            "side-link cart-link" + (isActive ? " active" : "")
          }
        >
          <span className="cart-label">
            <span className="cart-emoji" aria-hidden>
              🛒
            </span>
            <span>Carrito</span>
          </span>
          <span className="badge badge-cart">{cartCount}</span>
        </NavLink>

        {/* 🔐 Link al panel admin SOLO si es admin */}
        {isAdmin && (
          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              "side-link" + (isActive ? " active" : "")
            }
          >
            Panel admin
          </NavLink>
        )}
      </nav>

      {/* Zona inferior: login / logout */}
      <div style={{ marginTop: "auto" }}>
        <hr style={{ border: "none", borderTop: "1px solid #ffffff40", margin: "16px 4px" }} />

        {isAuthenticated ? (
          <button
            type="button"
            className="side-link"
            onClick={handleLogout}
            style={{ width: "100%", textAlign: "left" }}
          >
            Cerrar sesión {user?.username && `(${user.username})`}
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "side-link" + (isActive ? " active" : "")
            }
          >
            🔐 Iniciar sesión
          </NavLink>
        )}

        <div className="mini-footer">
          © 2025 Tienda. Todos los derechos reservados.
        </div>
      </div>
    </aside>
  );
}
