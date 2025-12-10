// src/pages/login/loginpage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/authcontext.jsx"; // ← RUTA CORRECTA

function LoginPage() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim()) {
      alert("Por favor ingresá un nombre de usuario");
      return;
    }

    login(username.trim());
    navigate("/");
  }

  return (
    <section style={{ padding: "2rem" }}>
      <h1>Iniciar sesión</h1>
      <p>Para acceder al carrito y al checkout, iniciá sesión.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </section>
  );
}

export default LoginPage;
