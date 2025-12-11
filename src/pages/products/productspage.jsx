import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./products.css";

import ProductCard from "./productcard.jsx";
import { useProducts } from "../../components/products/productscontext.jsx";

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // -------------------------------
  // 🔎 1) Buscar en URL (?q= )
  // -------------------------------
  const params = new URLSearchParams(location.search);
  const initialQ = params.get("q") || "";

  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState("todas");

  // Cuando cambia la URL, sincronizamos búsqueda
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const qFromUrl = p.get("q") || "";
    setQ(qFromUrl);
  }, [location.search]);

  const handleSearchChange = (e) => {
    const next = e.target.value;
    setQ(next);

    const search = next ? `?q=${encodeURIComponent(next)}` : "";
    navigate({ pathname: "/productos", search }, { replace: true });
  };

  // -------------------------------
  // 📦 2) Obtener productos desde el contexto
  // -------------------------------
  const { products, loadingProducts, errorProducts } = useProducts();

  // -------------------------------
  // 🔍 3) Filtros (texto + categoría)
  // -------------------------------
  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();

    return products.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const tags = Array.isArray(p.tags)
        ? p.tags.map((t) => String(t).toLowerCase())
        : [];
      const catP = String(p.category || "").toLowerCase();

      const okQ = qn
        ? title.includes(qn) ||
          desc.includes(qn) ||
          tags.some((t) => t.includes(qn)) ||
          catP.includes(qn)
        : true;

      const okC = cat === "todas" ? true : catP === cat;

      return okQ && okC;
    });
  }, [products, q, cat]);

  // -------------------------------
  // 📄 4) Paginación REAL
  // -------------------------------
  const [page, setPage] = useState(1);
  const pageSize = 4; // 👈 MOSTRAR 4 PRODUCTOS POR PÁGINA

  const totalPages = Math.ceil(filtered.length / pageSize);

  // Si cambian filtros, reseteamos a la página 1
  useEffect(() => {
    setPage(1);
  }, [q, cat]);

  // Si la página queda fuera del rango, la corregimos
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  // Cortamos los productos según la página actual
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  // -------------------------------
  // 🖼️ Render
  // -------------------------------
  return (
    <section id="productos">
      {/* Filtros */}
      <div className="filters">
        <h4>Filtros</h4>

        <div>
          <label>
            Búsqueda:{" "}
            <input
              type="text"
              placeholder="Buscar productos..."
              value={q}
              onChange={handleSearchChange}
            />
          </label>
        </div>

        <div>
          <label>
            Categoría:
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="todas">Todas</option>
              <option value="kawaii">Kawaii</option>
              <option value="termos">Termos</option>
              <option value="florales">Florales</option>
              <option value="retro">Retro</option>
              <option value="pop">Pop</option>
              <option value="viajes">Viajes</option>
              <option value="cute">Cute</option>
              <option value="animales">Animales</option>
              <option value="gamer">Gamer</option>
              <option value="osos">Osos</option>
              <option value="otros">Otros</option>
            </select>
          </label>
        </div>
      </div>

      {/* Estados */}
      {loadingProducts && <p>Cargando productos…</p>}

      {!loadingProducts && errorProducts && (
        <div className="alert error">{errorProducts}</div>
      )}

      {/* Grid de productos */}
      <div className="product-grid">
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>

        <span>
          Página {totalPages === 0 ? 0 : page} de {totalPages}
        </span>

        <button
          type="button"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
