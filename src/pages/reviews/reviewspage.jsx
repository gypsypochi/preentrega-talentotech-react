// src/pages/reviews/reviewspage.jsx
import { useState } from "react";
import "./reviews.css";
import reviewsRaw from "../../data/reviews.json";

import styled from "styled-components";
import { FiMessageCircle, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

// 🟣 styled-components
const ReviewsSection = styled.section`
  padding: 1.5rem 0 2rem;
`;

const ReviewCard = styled.article`
  background: var(--color-blanco);
  border: 2px solid var(--color-acento-rosa);
  border-radius: 14px;
  padding: 16px;
  color: var(--color-texto);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.12s ease, border-color 0.12s ease,
    box-shadow 0.12s ease;
  display: grid;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primario);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const ReviewAuthor = styled.strong`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-primario);
`;

const ReviewForm = styled.form`
  margin-top: 1.75rem;
  padding: 1rem 1.25rem;
  background: var(--color-blanco);
  border-radius: 16px;
  border: 2px solid var(--color-azul-claro);
  display: grid;
  gap: 0.75rem;
`;

const FormRow = styled.div`
  display: grid;
  gap: 0.35rem;

  label {
    font-weight: 600;
    color: var(--color-azul);
  }

  input,
  textarea {
    border-radius: 10px;
    border: 1px solid var(--color-azul-claro);
    padding: 0.5rem 0.75rem;
    font: inherit;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-azul);
    box-shadow: 0 0 0 3px var(--color-azul-claro);
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SendButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 999px;
  border: none;
  padding: 0.45rem 1.2rem;
  background: var(--color-verde);
  color: var(--color-blanco);
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(1.04);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default function ReviewsPage() {
  // 🔹 1) Inicializar reseñas desde localStorage o desde el JSON
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem("reviews");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Error leyendo reviews de localStorage", e);
      }
    }
    // si no hay nada en localStorage, usamos el JSON
    return Array.isArray(reviewsRaw) ? reviewsRaw : [];
  });

  // estado del formulario
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) {
      toast.error("Completá tu nombre y tu reseña 💌");
      return;
    }

    const newReview = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now(),
      author: name.trim(),
      text: text.trim(),
    };

    const nextReviews = [...reviews, newReview];
    setReviews(nextReviews);
    localStorage.setItem("reviews", JSON.stringify(nextReviews));

    toast.success("¡Gracias por tu reseña! 🥹💖");
    setName("");
    setText("");
  };

  return (
    <ReviewsSection aria-labelledby="reviews-title">
      <div className="container reviews">
        <h2 id="reviews-title">Reseñas de la tienda</h2>

        {/* Grilla Bootstrap + styled-components */}
        <div className="row g-3" role="list">
          {reviews.length === 0 ? (
            <div className="col-12" role="status" aria-live="polite">
              <ReviewCard>
                <ReviewText>No hay reseñas todavía.</ReviewText>
                <ReviewAuthor>— Equipo</ReviewAuthor>
              </ReviewCard>
            </div>
          ) : (
            reviews.map((r) => (
              <div
                key={r.id}
                className="col-12 col-md-6 col-lg-4"
                role="listitem"
              >
                <ReviewCard>
                  <ReviewText>“{r.text}”</ReviewText>
                  <ReviewAuthor>
                    <FiMessageCircle aria-hidden="true" />
                    {r.author}
                  </ReviewAuthor>
                </ReviewCard>
              </div>
            ))
          )}
        </div>

        {/* Formulario con Toastify + ARIA */}
        <ReviewForm
          onSubmit={handleSubmit}
          aria-label="Agregar una reseña. Se guarda localmente en este navegador."
        >
          <FormRow>
            <label htmlFor="review-name">Tu nombre</label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormRow>

          <FormRow>
            <label htmlFor="review-text">Tu reseña</label>
            <textarea
              id="review-text"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormRow>

          <FormActions>
            <SendButton
              type="submit"
              aria-label="Enviar reseña (se guardará en este navegador)"
            >
              <FiSend aria-hidden="true" />
              Enviar reseña
            </SendButton>
          </FormActions>
        </ReviewForm>
      </div>
    </ReviewsSection>
  );
}
