"use client";

import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import atualizado
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Uso do Next.js navigation

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === "admin@admin" && password === "admin@admin") {
      alert("Login bem-sucedido!");
      router.push("/Dashboard"); 
    } else {
      setError("Credenciais inválidas!");
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
          <label>
            <input type="checkbox" /> lembre de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>
        <button>Entrar</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="/register">Registrar</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
