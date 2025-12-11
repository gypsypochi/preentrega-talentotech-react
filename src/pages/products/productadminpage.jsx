// src/pages/products/productadminpage.jsx
import { useState, useMemo, useRef } from "react";
import { useProducts } from "../../components/products/productscontext.jsx";
import "./products.css";
import { toast } from "react-toastify"; // 👈 NUEVO

export default function ProductAdminPage() {
  const {
    products = [],
    loading = false,
    error = null,
    createProduct = async () => false,
    updateProduct = async () => false,
    deleteProduct = async () => false,
  } = useProducts() || {};

  const productList = Array.isArray(products) ? products : [];
  const formRef = useRef(null);

  const CATEGORIES = [
    "kawaii",
    "termos",
    "florales",
    "retro",
    "pop",
    "viajes",
    "cute",
    "animales",
    "gamer",
    "osos",
    "otros",
  ];

  // ⭐ TAGS EXISTENTES PARA AUTOCOMPLETE
  const existingTags = useMemo(() => {
    const all = new Set();
    products.forEach((p) => {
      if (Array.isArray(p.tags)) p.tags.forEach((t) => all.add(t));
    });
    return [...all];
  }, [products]);

  // ⭐ FORM DATA
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  function resetForm() {
    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      tags: [],
    });
    setTagInput("");
    setEditingId(null);
  }

  function validate(data) {
    if (!data.title.trim()) {
      toast.error("El nombre es obligatorio.");
      return false;
    }
    if (Number(data.price) <= 0) {
      toast.error("El precio debe ser mayor a 0.");
      return false;
    }
    if (data.description.trim().length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres.");
      return false;
    }
    return true;
  }

  // ⭐ CREAR / EDITAR
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate(formData)) return;

    const payload = {
      ...formData,
      price: Number(formData.price),
      tags: formData.tags,
    };

    let ok = false;

    try {
      if (editingId) {
        ok = await updateProduct(editingId, payload);
        if (ok !== false) {
          toast.success("Producto actualizado ✔");
        }
      } else {
        ok = await createProduct(payload);
        if (ok !== false) {
          toast.success("Producto creado 🎉");
        }
      }

      if (!ok) {
        toast.error("Error al guardar el producto.");
        return;
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error inesperado al guardar.");
    }
  }

  // ⭐ EDITAR (scroll incluido)
  function handleEdit(product) {
    setEditingId(product.id);

    setFormData({
      title: product.title || "",
      price: product.price != null ? String(product.price) : "",
      description: product.description || "",
      category: product.category || "",
      image: product.image || "",
      tags: Array.isArray(product.tags) ? product.tags : [],
    });

    setTagInput("");

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  // ⭐ ELIMINAR
  async function handleDelete(id) {
    if (!confirm("¿Eliminar este producto?")) return;

    try {
      const ok = await deleteProduct(id);
      if (!ok) {
        toast.error("No se pudo eliminar el producto.");
      } else {
        toast.success("Producto eliminado 🗑️");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al eliminar el producto.");
    }
  }

  // ⭐ TAGS
  function addTagFromInput() {
    const clean = tagInput.trim().toLowerCase();
    if (!clean) return;
    if (formData.tags.includes(clean)) return;

    setFormData({ ...formData, tags: [...formData.tags, clean] });
    setTagInput("");
  }

  function removeTag(t) {
    setFormData({
      ...formData,
      tags: formData.tags.filter((x) => x !== t),
    });
  }

  const filteredSuggestions = existingTags.filter(
    (t) => t.includes(tagInput.toLowerCase()) && !formData.tags.includes(t)
  );

  function prettyCategory(cat) {
    return cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "";
  }

  function prettyPrice(value) {
    return Number(value ?? 0).toLocaleString("es-AR");
  }

  return (
    <section className="admin-panel">
      <h2>Administrar productos</h2>

      <h3>Productos existentes</h3>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="alert error">{error}</p>}

      {/* LISTADO */}
      <div className="admin-products-list">
        {productList.map((p) => (
          <div key={p.id} className="admin-product-item">
            <div className="admin-product-main">
              <h4>{p.title}</h4>
              <p className="price">${prettyPrice(p.price)}</p>

              {p.category && (
                <p className="category">
                  Categoría: {prettyCategory(p.category)}
                </p>
              )}

              {p.description && (
                <p className="description">
                  {p.description.length > 80
                    ? p.description.slice(0, 80) + "…"
                    : p.description}
                </p>
              )}
            </div>

            <div className="admin-product-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(p)}
              >
                Editar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleDelete(p.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FORMULARIO */}
      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
        <h3>{editingId ? "Editar producto" : "Agregar nuevo producto"}</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Precio"
          value={
            formData.price
              ? `$${Number(formData.price).toLocaleString("es-AR")}`
              : ""
          }
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, price: raw });
          }}
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Seleccionar categoría…</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {prettyCategory(cat)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="URL de imagen"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />

        <textarea
          placeholder="Descripción (mínimo 10 caracteres)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* TAGS */}
        <div className="tag-editor">
          <label>Etiquetas (tags)</label>

          <div className="tag-input-row">
            <input
              type="text"
              placeholder="Agregar tag…"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTagFromInput())
              }
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={addTagFromInput}
            >
              +
            </button>
          </div>

          <div className="tag-list">
            {formData.tags.map((t) => (
              <span key={t} className="tag-item">
                {t}
                <button type="button" onClick={() => removeTag(t)}>
                  ×
                </button>
              </span>
            ))}
          </div>

          {filteredSuggestions.length > 0 && (
            <div className="tag-suggestions">
              {filteredSuggestions.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tags: [...formData.tags, t],
                    })
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Guardar cambios" : "Crear"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
