import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./products.css";
import ProductCard from "./productcard.jsx";

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 👇 leer la query ?q= al primer render
  const params = new URLSearchParams(location.search);
  const initialQ = params.get("q") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 q arranca desde la URL
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState("todas");

  // 👇 si cambia la URL (por un click en una tag), sincronizamos q
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const qFromUrl = p.get("q") || "";
    setQ(qFromUrl);
  }, [location.search]);

  // 👇 cuando el usuario tipea, actualizamos la URL
  const handleSearchChange = (e) => {
    const next = e.target.value;
    setQ(next);
    const search = next ? `?q=${encodeURIComponent(next)}` : "";
    navigate({ pathname: "/productos", search }, { replace: true });
  };

  // 👇 cargar productos
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data/products.json", { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error("JSON vacío");
        setItems(data);
      } catch (err) {
        setError("No se pudieron cargar los productos.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // 👇 filtrar productos (ahora busca en título, descripción, tags y categoría)
  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();

    return items.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const desc  = (p.description || "").toLowerCase();
      const tags  = Array.isArray(p.tags) ? p.tags.map(t => String(t).toLowerCase()) : [];
      const catP  = String(p.category || "").toLowerCase();

      const okQ = qn
        ? title.includes(qn) ||
          desc.includes(qn) ||
          tags.some(t => t.includes(qn)) ||
          catP.includes(qn)
        : true;

      const okC = cat === "todas" ? true : catP === cat;

      return okQ && okC;
    });
  }, [items, q, cat]);

  return (
    <section id="productos">
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

      {loading && <p>Cargando productos…</p>}
      {!loading && error && <div className="alert error">{error}</div>}

      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="pagination">
        <button type="button" disabled>Anterior</button>
        <span>Página 1 de 1</span>
        <button type="button" disabled>Siguiente</button>
      </div>
    </section>
  );
}
