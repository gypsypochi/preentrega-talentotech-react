import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/authcontext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const name = username.trim();
    if (!name) {
      setError("Ingresá un nombre de usuario.");
      return;
    }

    // 👑 modo admin: usuario "admin" + pass "1234"
    if (name.toLowerCase() === "admin") {
      if (password !== "1234") {
        setError("Contraseña de admin incorrecta. (Pista: 1234 😉)");
        return;
      }
      login(name, true); // admin
    } else {
      // usuario normal, la contraseña no importa
      login(name, false);
    }

    navigate(from, { replace: true });
  }

  return (
    <section style={{ maxWidth: 480 }}>
      <h2>Iniciar sesión</h2>
      <p>
        Si ingresás como <strong>admin</strong>, vas a ver el panel para administrar
        productos.
      </p>
      <ul style={{ fontSize: ".9rem", marginTop: 4 }}>
        <li>Usuario admin: <code>admin</code></li>
        <li>Contraseña admin: <code>1234</code></li>
        <li>Para cliente normal: solo poné tu nombre, podés dejar la contraseña vacía.</li>
      </ul>

      <form
        onSubmit={handleSubmit}
        style={{ marginTop: 16, display: "grid", gap: 12 }}
      >
        {error && <div className="alert error">{error}</div>}

        <label>
          Nombre de usuario
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej: Mica"
          />
        </label>

        <label>
          Contraseña (solo si es admin)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Solo para admin: 1234"
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}
