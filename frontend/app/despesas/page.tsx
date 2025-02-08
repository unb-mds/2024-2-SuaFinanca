"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa"
import "./despesas.css"
import Layout from "../components/Layout"
import { useAuth } from "../contexts/AuthContext"

const months = [
  "Janeiro ", "Fevereiro ", "Março ", "Abril ", "Maio ", "Junho ",
  "Julho ", "Agosto ", "Setembro ", "Outubro ", "Novembro ", "Dezembro " 
]

export default function Despesas() {
  const { isAuthenticated } = useAuth()
  const [currentMonthIndex, setCurrentMonthIndex] = useState(months.length - 1)

  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : months.length - 1))
  }

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex < months.length - 1 ? prevIndex + 1 : 0))
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar as despesas</p>
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
            <h1 className="page-title">Despesas</h1>
          </div>

          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{months[currentMonthIndex]}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Situação</th>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Conta</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>{/* Table content will be populated here */}</tbody>
            </table>
          </div>

          <Link href="/despesas/nova" className="new-button">
            <FaPlus /> Nova Despesa
          </Link>
        </div>

        <div className="summary-cards">
          <div className="summary-card pending">
            <h3>Despesas Pendentes</h3>
            <p className="amount">R$ 0,00</p>
            <div className="icon up-arrow">↑</div>
          </div>
          <div className="summary-card expenses">
            <h3>Despesas Pagas</h3>
            <p className="amount">R$ 0,00</p>
            <div className="icon down-arrow">↓</div>
          </div>
          <div className="summary-card total">
            <h3>Total</h3>
            <p className="amount">R$ 0,00</p>
            <div className="icon balance">⚖</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

