import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart_items";

function loadSafe() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function normalize(product) {
  const id = product?.id ?? product?.productId ?? product?.sku ?? "";
  const title = product?.title ?? product?.name ?? "Producto";
  const price = Number(product?.price ?? 0);
  const image = product?.image ?? product?.img ?? product?.thumbnail ?? "";
  const qty = Math.max(1, Number(product?.qty ?? 1));

  return {
    id: String(id),
    title: String(title),
    price: isNaN(price) ? 0 : price,
    image: String(image),
    qty: isNaN(qty) ? 1 : qty,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadSafe());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (product) => {
    const toAdd = normalize(product);
    if (!toAdd.id) return;
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === toAdd.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: Math.max(1, Number(copy[idx].qty ?? 1)) + 1 };
        return copy;
      }
      return [...prev, toAdd];
    });
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== String(id)));

  const clearCart = () => setItems([]);

  const increaseQty = (id) =>
    setItems((prev) =>
      prev.map((p) =>
        p.id === String(id) ? { ...p, qty: Math.max(1, Number(p.qty ?? 1)) + 1 } : p
      )
    );

  const decreaseQty = (id) =>
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === String(id)
            ? { ...p, qty: Math.max(0, Math.floor(Number(p.qty ?? 1)) - 1) }
            : p
        )
        .filter((p) => p.qty > 0)
    );

  const cartCount = useMemo(
    () => items.reduce((n, p) => n + Math.max(1, Number(p.qty || 0)), 0),
    [items]
  );

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (s, p) =>
          s + (isNaN(Number(p.price)) ? 0 : Number(p.price)) * Math.max(1, Number(p.qty || 0)),
        0
      ),
    [items]
  );

  const value = {
    items,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
