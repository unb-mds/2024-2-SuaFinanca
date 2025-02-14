"use client";

import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import "./login.css";
import { useAuth } from "../contexts/AuthContext";

interface LoginProps {

  onLoginSuccess?: () => void
  onClose?: () => void
}

export default function Login({ onLoginSuccess, onClose }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com"


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email: username,
        password: password,
      });


      console.log("Resposta da API:", response.data)

      const { token, user } = response.data
      login(token, user.name)


      if (onLoginSuccess) {
        onLoginSuccess();
      }


      if (onClose) {
        onClose()
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Credenciais inválidas! Verifique seu e-mail e senha.")

    }
  };

  return (

    <div className="login-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="login-modal">
        {onClose && (
          <button type="button" className="close-button" onClick={onClose}>
            ×
          </button>
        )}
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="input-field">
            <input type="email" placeholder="E-mail" value={username} onChange={(e) => setUsername(e.target.value)} />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FaLock className="icon" />
          </div>
          <div className="recall-forget">
            <label>
              <input type="checkbox" /> Lembre de mim
            </label>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <button type="submit">Entrar</button>
          <div className="signup-link">
            Não tem uma conta? <a href="/register">Registre-se</a>
          </div>
        </form>
      </div>

    </div>
  );
}
