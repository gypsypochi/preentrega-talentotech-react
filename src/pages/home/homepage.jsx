import "./home.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function HomePage() {
  return (
    <section id="inicio" className="home">
      {/* Hero */}
      <div className="home-hero">
        <img src="/assets/logo.png" alt="Sticker Therapy - Logo" className="home-logo" />
        <p className="home-intro">
          En Sticker Therapy diseñamos stickers coloridos, resistentes y súper versátiles.
          Encontrá packs temáticos (kawaii, florales, retro, pop y más) para personalizar
          cuadernos, botellas y tus cosas favoritas.
        </p>
      </div>

      {/* Sobre mí con foto + texto + redes */}
      <div className="home-about">
        <h3>Sobre mí</h3>
        <div className="about-content">
          <img
            src="/assets/perfil.png"
            alt="Micaela Luaces"
            className="about-photo"
          />
          <div className="about-text">
            <p>
              Soy <strong>Micaela Luaces</strong>, creadora de Sticker Therapy.
              Me inspiran los colores y los detalles que vuelven único a cada diseño.
              ¡Gracias por apoyar los proyectos hechos con amor!
            </p>

            <div className="about-social">
              <a
                href="https://www.instagram.com/sticker.therapy1/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-instagram"
              >
                <FaInstagram size={20} /> Instagram
              </a>
              <a
                href="https://wa.me/5491169773170"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <FaWhatsapp size={20} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
