// src/components/products/productscontext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

const API_URL = "https://693ada199b80ba7262cba544.mockapi.io/products";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- GET ---
  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener productos");

      const data = await res.json();
      setProducts(data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- POST ---
  async function createProduct(prod) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prod),
      });

      if (!res.ok) throw new Error("No se pudo crear");

      const newProd = await res.json();
      setProducts((prev) => [...prev, newProd]);
      return true; // ✅ IMPORTANTE
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // --- PUT ---
  async function updateProduct(id, updatedFields) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) throw new Error("No se pudo actualizar");

      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));

      return true; // ✅ IMPORTANTE
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // --- DELETE ---
  async function deleteProduct(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("No se pudo eliminar");

      setProducts((prev) => prev.filter((p) => p.id !== id));

      return true; // ✅ IMPORTANTE
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
