# 🛒 Pre-Entrega & Entrega Final React JS - Talento Tech

Proyecto de e-commerce de **Sticker Therapy**, desarrollado en **React + Vite** como pre-entrega y entrega final.  
Autora: **Micaela Natalia Luaces**.
Curso: React Js
2do cuatrimestre 2025
Talento Tech
---

## 🚀 Tecnologías utilizadas
- React + Vite  
- React Router DOM  
- Hooks (`useState`, `useEffect`, `useMemo`, `useContext`)  
- Context API (Auth, Cart, Products)  
- MockAPI para CRUD remoto  
- React Icons  
- React Toastify  
- CSS3 con variables globales  
- LocalStorage  
- Deploy en Vercel  

## 📁 Estructura del proyecto (resumen)

    src/
    ├─ components/ # Sidebar, layout, carrito, auth, productos
    ├─ pages/ # Home, productos, detalle, reseñas, admin
    ├─ data/ # Datos locales (reseñas)
    ├─ styles/ # CSS global y layout
    ├─ assets/ # Imágenes
    └─ App.jsx # Rutas principales

---

## 🟦 Primera entrega

### Requerimiento #1: Carrito de compras
- Listado de productos con botón **“Agregar al carrito”**  
- Estado global del carrito con Context API  
- Persistencia básica del carrito  
- Página `/carrito` con productos, cantidades y total  

### Requerimiento #2: API de productos (simulada)
- Conexión inicial a **`/data/products.json`** como simulación de API  
- Manejo de estado de carga (`loading`) y errores  
- Actualización del diseño y carrito ampliado  

### Requerimiento #3: Rutas
- Implementación de rutas con React Router  
- Secciones:
  - Inicio `/`
  - Productos `/productos`
  - Reseñas `/reseñas`
  - Carrito `/carrito`
- Manejo de carga y errores en vistas  

### Requerimiento #4: Rutas dinámicas y protegidas
- Ruta dinámica `/producto/:id` para ver el detalle del producto  
- Ruta protegida `/checkout`, accesible según la lógica de la app  

---

## 🟩 Entrega final

### Requerimiento #1: Gestión del Carrito y Autenticación de Usuarios
- Carrito de compras con Context API (agregar, eliminar, vaciar)  
- Estado global persistido con LocalStorage  
- `AuthContext` para manejar autenticación de usuario  
- Login simulado con datos en memoria / localStorage  
- Rutas protegidas para `/checkout` y `/admin/productos`  

---

### Requerimiento #2: CRUD de Productos con MockAPI
**Endpoint utilizado:**  
https://693ada199b80ba7262cba544.mockapi.io/products

- Obtener productos desde MockAPI (GET)  
- Crear productos (POST) mediante formulario controlado  
- Editar productos (PUT) con carga previa en el formulario  
- Eliminar productos (DELETE) con confirmación  
- Validaciones del formulario:
  - Nombre obligatorio  
  - Precio mayor a 0  
  - Descripción mínima de 10 caracteres  
- Manejo de errores y estados (`loading` / `error`)  
- Mensajes de éxito y error (alerts / Toastify)  
- Tags dinámicos con sugerencias basadas en productos existentes  

---

### Requerimiento #3: Optimización de Diseño y Responsividad
- Sidebar adaptado para pantallas móviles, tablets y escritorio  
- Grilla responsiva para listado de productos y reseñas  
- Botones con iconos usando **React Icons**  
- Notificaciones visuales usando **React Toastify**  
- Accesibilidad básica con ARIA en elementos interactivos  
- Ajustes generales de UI/UX (hover, transiciones, sombras, etc.)  

---

### Requerimiento #4: Funcionalidades de Búsqueda y Paginación
- Barra de búsqueda que filtra productos por:
  - Nombre  
  - Categoría  
  - Descripción  
  - Tags  
- Paginación funcional:
  - 4 productos por página  
  - Botones **Anterior** y **Siguiente** habilitados según corresponda  
  - Paginador compatible con los filtros activos  

---

### Requerimiento #5: Preparación para el Despliegue
- Pruebas de funcionamiento en:
  - Móviles  
  - Tablets  
  - Escritorio  
- Ajustes de layout para mejorar tiempos de carga percibidos y experiencia de usuario  
- Limpieza y organización del código y estilos  
- Estado global centralizado en Contexts (`AuthContext`, `CartContext`, `ProductsContext`)  
- Documentación mediante este `README.md`  

---

## 🔧 Clonar e iniciar el proyecto

```bash
git clone https://github.com/gypsypochi/preentrega-talentotech-react
cd preentrega-talentotech-react
npm install
npm run dev
La app inicia en: http://localhost:5173/


Deploy El proyecto está desplegado en Vercel: 
👉 https://preentrega-talentotech-react.vercel.app/