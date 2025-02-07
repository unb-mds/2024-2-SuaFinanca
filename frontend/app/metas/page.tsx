"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight, FaPlus, FaBullseye, FaCheckCircle } from "react-icons/fa"
import "./metas.css"
import Layout from "../components/Layout"
import { useAuth } from "../contexts/AuthContext"

const months = [
  "Janeiro ", "Fevereiro ", "Março ", "Abril ", "Maio ", "Junho ",
  "Julho ", "Agosto ", "Setembro ", "Outubro ", "Novembro ", "Dezembro " 
]

export default function Metas() {
  const { isAuthenticated } = useAuth()
  const [currentMonth, setCurrentMonthIndex] = useState("Dezembro 2024")
  const [goals, setGoals] = useState([])

  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : months.length - 1))
  }

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex < months.length - 1 ? prevIndex + 1 : 0))
  }

  const handleNewGoal = () => {
    // Add new goal logic here
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar as metas</p>
          <Link href="/dashboard">
            <button>Voltar para o Dashboard</button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="content-area">
          <div className="header-section">
            <Link href="/dashboard" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1 className="page-title">Metas</h1>
          </div>

          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{currentMonth}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>

          <div className="goals-grid">
            <button className="new-goal-card" onClick={handleNewGoal}>
              <div className="new-goal-content">
                <FaPlus className="plus-icon" />
                <span>Nova Meta</span>
              </div>
            </button>
            {goals.map((goal) => (
              // Goals will be rendered here
              <div key={goal.id} className="goal-card">
                {/* Goal details */}
              </div>
            ))}
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <h3>Saldo Atual</h3>
            <p className="amount">R$ 0,00</p>
            <div className="icon">
              <FaBullseye />
            </div>
          </div>
          <div className="summary-card">
            <h3>Metas Concluídas</h3>
            <p className="amount">0</p>
            <div className="icon">
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

