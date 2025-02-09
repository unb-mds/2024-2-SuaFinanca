"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaUser, FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa"
import axios from "axios"
import "./register.css"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:8000/user/register", {
        name,
        email,
        password,
      })
      router.push("/?showLogin=true")
    } catch (err) {
      setError("Erro ao registrar usuário!")
    }
  }

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft /> Voltar
        </button>
        <h1>Registrar</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-field">
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}

