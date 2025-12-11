// src/pages/products/productdetail.jsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../components/products/productscontext.jsx";
import { useCart } from "../../components/cart/cartcontext.jsx";
import "./products.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // ✅ USAMOS EL CONTEXT REAL
  const { products, fetchProducts, loading, error } = useProducts();

  // si no hay productos cargados, los traemos
  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, []);

  // encontrar producto (MockAPI usa strings)
  const product = products.find((p) => String(p.id) === String(id));

  if (loading) return <p>Cargando producto…</p>;
  if (error) return <p className="alert error">{error}</p>;

  if (!product)
    return (
      <section className="product-detail">
        <div className="detail-wrap">
          <p>Producto no encontrado.</p>
          <Link to="/productos" className="back-link">
            ← Volver a productos
          </Link>
        </div>
      </section>
    );

  // normalizamos
  const normalized = {
    id: String(product.id),
    title: product.title || product.name || "Producto",
    price: Number(product.price ?? 0),
    image: product.image || "",
    description: product.description || "",
    tags: Array.isArray(product.tags) ? product.tags : [],
    category: String(product.category ?? "otros").toLowerCase(),
  };

  return (
    <section className="product-detail">
      <div className="detail-wrap">
        <Link to="/productos" className="back-link">
          ← Volver a productos
        </Link>

        <div className="detail-layout">
          <div className="detail-image">
            {normalized.image && (
              <img src={normalized.image} alt={normalized.title} />
            )}
          </div>

          <div className="detail-info">
            <h2>{normalized.title}</h2>
            <p className="price">${normalized.price}</p>

            {normalized.description && (
              <p className="description">{normalized.description}</p>
            )}

            {normalized.tags.length > 0 && (
              <div className="tags">
                {normalized.tags.map((t) => (
                  <Link
                    key={t}
                    to={`/productos?q=${encodeURIComponent(t)}`}
                    className="tag"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            )}

            <div className="actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  addToCart({
                    id: normalized.id,
                    title: normalized.title,
                    price: normalized.price,
                    image: normalized.image,
                  })
                }
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
