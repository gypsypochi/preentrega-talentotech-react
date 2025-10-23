import { useCart } from "../../components/cart/cartcontext.jsx";
// 👇 NUEVO
import { Link } from "react-router-dom";

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
      {normalized.image && <img src={normalized.image} alt={normalized.title} />}
      <h3>{normalized.title}</h3>
      <p><strong>${normalized.price.toFixed(2)}</strong></p>

      <div className="card-actions">
        {/* 👇 Cambiamos el botón por Link */}
        <Link to={`/producto/${normalized.id}`} className="btn">
          Ver más
        </Link>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addToCart(normalized)}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
