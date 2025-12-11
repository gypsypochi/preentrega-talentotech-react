import { useCart } from "../../components/cart/cartcontext.jsx";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";  // 👈 NUEVO

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const normalized = {
    id: product.id,
    title: product.title || product.name || "Producto",
    price: Number(product.price ?? 0),
    image: product.image || product.img || product.thumbnail || "",
  };

  return (
    <article className="product-card">
      {normalized.image && (
        <img src={normalized.image} alt={normalized.title} />
      )}
      <h3>{normalized.title}</h3>
      <p>
        <strong>${normalized.price.toFixed(2)}</strong>
      </p>

      <div className="card-actions">
        <Link to={`/producto/${normalized.id}`} className="btn">
          Ver más
        </Link>

        <button
          type="button"
          className="btn btn-primary add-cart-btn"     // 👈 agregamos una clase extra
          onClick={() => addToCart(normalized)}
        >
          <FiShoppingCart aria-hidden="true" />
          <span>Agregar</span>
        </button>
      </div>
    </article>
  );
}
