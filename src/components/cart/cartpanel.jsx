// src/components/cart/cartpanel.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./cartcontext.jsx";

export default function CartPanel() {
  const {
    items,
    cartTotal,
    removeFromCart,
    clearCart,
    increaseQty,    // 👈 acá traemos +/−
    decreaseQty,
  } = useCart();

  const navigate = useNavigate();
  const isEmpty = items.length === 0;

  return (
    <section id="carrito" aria-labelledby="cart-title">
      <h3 id="cart-title">{isEmpty ? "Carrito" : `Carrito (${items.length})`}</h3>

      {isEmpty ? (
        <>
          <p>Tu carrito está vacío.</p>
          <div className="empty-cta">
            <Link to="/productos" className="btn-cta">
              <span className="icon">🛍️</span> Ver productos
            </Link>
          </div>
        </>
      ) : (
        <ul className="cart-list">
          {items.map((p) => (
            <li key={p.id} className="cart-row">
              <div className="cart-info">
                <strong>{p.title}</strong>
              </div>

              <div className="cart-actions-row">
                {/* 👇 Stepper de cantidad */}
                <div className="qty-stepper" role="group" aria-label={`Cantidad de ${p.title}`}>
                  <button
                    type="button"
                    className="stepper-btn"
                    aria-label={`Disminuir cantidad de ${p.title}`}
                    onClick={() => decreaseQty(p.id)}
                  >
                    −
                  </button>
                  <span className="qty-value">{p.qty}</span>
                  <button
                    type="button"
                    className="stepper-btn"
                    aria-label={`Aumentar cantidad de ${p.title}`}
                    onClick={() => increaseQty(p.id)}
                  >
                    +
                  </button>
                </div>

                <span className="row-price">${(p.price * p.qty).toFixed(2)}</span>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeFromCart(p.id)}
                >
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-footer">
        <p><strong>Total:</strong> ${cartTotal.toFixed(2)}</p>

        <div className="checkout-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearCart}
            disabled={isEmpty}
          >
            Vaciar
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/checkout")}
            disabled={isEmpty}
          >
            Ir al checkout
          </button>
        </div>
      </div>
    </section>
  );
}
