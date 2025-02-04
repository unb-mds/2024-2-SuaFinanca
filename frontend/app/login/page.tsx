"use client"

import { FaUser, FaLock } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"
import "./login.css"

interface LoginProps {
  onLoginSuccess?: () => void
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email: username,
        password: password,
      })

      const { token, name } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("username", name)

      if (onLoginSuccess) {
        onLoginSuccess()
      }
    } catch (err) {
      setError("Credenciais inválidas!")
    }
  }

  return (
    <div className="login-container">
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
  )
}

