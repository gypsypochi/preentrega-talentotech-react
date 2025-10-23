// src/pages/reviews/reviewspage.jsx
import "./reviews.css"; // ✅ estilos
import reviewsRaw from "../../data/reviews.json"; // ✅ JSON vía Vite

export default function ReviewsPage() {
  const reviews = Array.isArray(reviewsRaw) ? reviewsRaw : [];

  return (
    <section className="reviews">
      <div className="reviews-grid">
        {reviews.length === 0 ? (
          <div className="review-card">
            <p>No hay reseñas todavía.</p>
            <strong>— Equipo</strong>
          </div>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="review-card">
              <p>“{r.text}”</p>
              <strong>— {r.author}</strong>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
