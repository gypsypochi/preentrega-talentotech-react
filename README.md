# 🛒 Pre-Entrega React JS - Talento Tech

Proyecto de e-commerce de Sticker Therapy, desarrollado en React + Vite como pre-entrega  
Autora: Micaela Natalia Luaces.

---

## 🚀 Tecnologías utilizadas
- React + Vite  
- React Router DOM  
- Hooks (`useState`, `useEffect`, `useMemo`, `useContext`)  
- Context API para manejo global del carrito  
- CSS3 y HTML5  
- Persistencia en LocalStorage  

---

## ✅ Requerimientos cumplidos

### Requerimiento #1: Carrito de compras
- Listado de productos con botón **“Agregar al carrito”**  
- Estado global del carrito con Context API  
- Página `/carrito` con productos, cantidades y total  

### Requerimiento #2: API de productos
- Conexión a **`/data/products.json`** (simulación de API)  
- Manejo de estado de carga (`loading`) y errores  
- Actualización del diseño y carrito ampliado  

### Requerimiento #3: Rutas
- Implementación de rutas con React Router  
- Secciones: Inicio `/`, Productos `/productos`, Reseñas `/reseñas`, Carrito `/carrito`  
- Manejo de carga y errores en vistas  

### Requerimiento #4: Rutas dinámicas y protegidas
- Ruta dinámica `/producto/:id` para ver el detalle  
- Ruta protegida `/checkout`, accesible solo si hay productos en el carrito  

---

Deploy
El proyecto está desplegado en Vercel:  
👉 https://preentrega-talentotech-react.vercel.app/
