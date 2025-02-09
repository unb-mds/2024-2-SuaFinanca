"use client"

import { useState } from "react"
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Layout from "../components/Layout"
import { useAuth } from "../contexts/AuthContext"
import Login from "../login/page"

export default function Dashboard() {
  const { isAuthenticated, username } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [currentMonth] = useState("novembro")

  const handleLoginSuccess = () => {
    setShowLogin(false)
  }

  return (
    <Layout>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="month-selector">{currentMonth}</div>
          <div className="welcome-message">Olá, {isAuthenticated ? username : "undefined"}</div>
        </div>

        <div className="cards-grid">
          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Saldo Atual</h3>
                <FaWallet className="card-icon" />
              </div>
              <p className="card-value">{isAuthenticated ? "R$ 0,00" : "****"}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Receitas</h3>
                <FaArrowUp className="card-icon income" />
              </div>
              <p className="card-value">{isAuthenticated ? "R$ 0,00" : "****"}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Despesas</h3>
                <FaArrowDown className="card-icon expense" />
              </div>
              <p className="card-value">{isAuthenticated ? "R$ 0,00" : "****"}</p>
            </div>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="dashboard-sections">
            <div className="section-card">
              <h3>Receita</h3>
              <div className="section-content">
                <p>Nenhuma receita registrada</p>
              </div>
            </div>

            <div className="section-card">
              <h3>Despesas</h3>
              <div className="section-content">
                <p>Nenhuma despesa registrada</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-prompt">
            <p>Faça login para acessar todos os recursos</p>
            <button onClick={() => setShowLogin(true)}>Entrar</button>
          </div>
        )}

        {showLogin && (
          <div className="login-overlay">
            <div className="login-modal">
              <button className="close-button" onClick={() => setShowLogin(false)}>
                ×
              </button>
              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

