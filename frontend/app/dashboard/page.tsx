"use client"

import { useState, useEffect } from "react"
import { FaWallet, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Layout from "../components/Layout"
import { useAuth } from "../contexts/AuthContext"
import Login from "../login/page"

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

export default function Dashboard() {
  const { isAuthenticated, username } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth())
  const [receitas, setReceitas] = useState(0)
  const [despesas, setDespesas] = useState(0)
  const [saldoTotal, setSaldoTotal] = useState(0)

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  useEffect(() => {
    if (!isAuthenticated || !token) return

    const fetchTransacoes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=100`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar transações: ${response.statusText}`)
        }

        const data = await response.json()

        if (!data || !data.recent || !Array.isArray(data.recent.transaction)) {
          throw new Error("Resposta inválida da API: estrutura inesperada")
        }

        const transacoes = data.recent.transaction

        // Filtra receitas e despesas do mês selecionado
        const receitasMes = transacoes
          .filter((item) => item.type === "INCOME" && new Date(item.date).getMonth() === currentMonthIndex)
          .reduce((sum, r) => sum + r.amount, 0)

        const despesasMes = transacoes
          .filter((item) => item.type === "EXPENSE" && new Date(item.date).getMonth() === currentMonthIndex)
          .reduce((sum, d) => sum + d.amount, 0)

        setReceitas(receitasMes)
        setDespesas(despesasMes)

        // Calcula o saldo total (considerando todos os meses)
        const saldoTotalCalculado = transacoes.reduce((total, t) => {
          return t.type === "INCOME" ? total + t.amount : total - t.amount
        }, 0)

        setSaldoTotal(saldoTotalCalculado)

      } catch (error) {
        console.error("Erro ao carregar transações:", error)
      }
    }

    fetchTransacoes()
  }, [currentMonthIndex, token, isAuthenticated])

  const handleLoginSuccess = () => {
    setShowLogin(false)
  }

  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : months.length - 1))
  }

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex < months.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Layout>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{months[currentMonthIndex]}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>
          <div className="welcome-message">Olá, {isAuthenticated ? username : "visitante"}</div>
        </div>

        <div className="cards-grid">
          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Saldo Total</h3>
                <FaWallet className="card-icon" />
              </div>
              <p className="card-value">{isAuthenticated ? `R$ ${saldoTotal.toFixed(2)}` : "****"}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Receitas (Mês)</h3>
                <FaArrowUp className="card-icon income" />
              </div>
              <p className="card-value">{isAuthenticated ? `R$ ${receitas.toFixed(2)}` : "****"}</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Despesas (Mês)</h3>
                <FaArrowDown className="card-icon expense" />
              </div>
              <p className="card-value">{isAuthenticated ? `R$ ${despesas.toFixed(2)}` : "****"}</p>
            </div>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="dashboard-sections">
            <div className="section-card">
              <h3>Receitas</h3>
              <div className="section-content">
                {receitas > 0 ? `R$ ${receitas.toFixed(2)}` : "Nenhuma receita registrada"}
              </div>
            </div>

            <div className="section-card">
              <h3>Despesas</h3>
              <div className="section-content">
                {despesas > 0 ? `R$ ${despesas.toFixed(2)}` : "Nenhuma despesa registrada"}
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
