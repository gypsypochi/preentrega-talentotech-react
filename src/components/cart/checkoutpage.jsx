import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "./cartcontext.jsx";
import "./cart.css";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const isEmpty = !items || items.length === 0;
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Protegemos la ruta, pero si ya mostramos éxito NO redirigimos
  if (isEmpty && !success) return <Navigate to="/productos" replace />;

  const handleConfirm = () => {
    if (processing) return;
    setProcessing(true);

    // Simula “procesando…”
    setTimeout(() => {
      setSuccess(true);          // mostramos el modal
      // dejamos el modal visible, luego limpiamos y redirigimos
      setTimeout(() => {
        clearCart();             // vacía el carrito
        navigate("/");           // o "/productos" o "/carrito", a gusto
      }, 1400);
    }, 700);
  };

  return (
    <section className="checkout">
      <h2>Finalizar compra</h2>

      <ul className="cart-list" style={{ marginTop: 12 }}>
        {items.map((i) => (
          <li key={i.id} className="cart-row">
            <div className="cart-info">
              <strong>{i.title}</strong> <span className="qty-badge">x{i.qty}</span>
            </div>
            <div className="cart-actions-row">
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-footer">
        <p><strong>Total:</strong> ${cartTotal.toFixed(2)}</p>

        <div className="checkout-actions">
          <Link to="/carrito" className="btn btn-secondary">← Volver al carrito</Link>
          {/* Quitamos “Vaciar” en checkout para evitar confusión */}
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={processing}
          >
            {processing ? "Procesando..." : "Confirmar compra"}
          </button>
        </div>
      </div>

      {/* Modal de éxito */}
      {success && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>🎉 ¡Compra confirmada!</h3>
            <p>Gracias por tu compra. Te redirigimos en un momento…</p>
          </div>
        </div>
      )}
    </section>
  );
}
