// src/pages/products/productdetail.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../components/cart/cartcontext.jsx";
import "./products.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data/products.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) {
          setError("No se pudo cargar este producto.");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const product = useMemo(
    () => items.find((p) => String(p.id) === String(id)),
    [items, id]
  );

  if (loading) return <p>Cargando producto…</p>;
  if (error)   return <p className="alert error">{error}</p>;
  if (!product)
    return (
      <section className="product-detail">
        <div className="detail-wrap">
          <p>Producto no encontrado.</p>
          <Link to="/productos" className="back-link">← Volver a productos</Link>
        </div>
      </section>
    );

  const normalized = {
    id: String(product.id),
    title: product.title || product.name || "Producto",
    price: Number(product.price ?? 0),
    image: product.image || product.img || product.thumbnail || "",
    description: product.description || "",
    tags: Array.isArray(product.tags) ? product.tags : [],
    category: String(product.category ?? "otros").toLowerCase(),
  };

  return (
    <section className="product-detail">
      <div className="detail-wrap">
        <Link to="/productos" className="back-link">← Volver a productos</Link>

        <div className="detail-layout">
          <div className="detail-image">
            {normalized.image && (
              <img src={normalized.image} alt={normalized.title} />
            )}
          </div>

          <div className="detail-info">
            <h2>{normalized.title}</h2>
            <p className="price">${normalized.price.toFixed(2)}</p>

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
