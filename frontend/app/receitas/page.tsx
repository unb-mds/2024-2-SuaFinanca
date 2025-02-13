"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa"
import "./receitas.css"
import Layout from "../components/Layout"
import { useAuth } from "../contexts/AuthContext"

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

export default function Receitas() {
  const { isAuthenticated } = useAuth()
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  const BASE_URL = "http://localhost:8000"

  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth())
  const [totalRecebido, setTotalRecebido] = useState(0)
  const [totalGasto, setTotalGasto] = useState(0)

  // Busca o balanço de receitas e despesas do mês selecionado
  useEffect(() => {
    if (!isAuthenticated || !token) return

    const fetchBalance = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/balance?month=${currentMonthIndex + 1}&year=${new Date().getFullYear()}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar balanço: ${response.statusText}`)
        }

        const data = await response.json()

        // Verifica se "balance" existe na resposta
        if (!data || !data.balance || typeof data.balance !== "object") {
          throw new Error("Estrutura da API não contém o balanço esperado.")
        }

        setTotalRecebido(data.balance.totalIncome || 0)
        setTotalGasto(data.balance.totalExpense || 0)

      } catch (error) {
        console.error("Erro ao carregar balanço:", error)
      }
    }

    fetchBalance()
  }, [currentMonthIndex, token, isAuthenticated])

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
          <p>Faça login para acessar as receitas</p>
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
            <h1 className="page-title">Receitas</h1>
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

          <Link href="/receitas/nova" className="new-button">
            <FaPlus /> Nova Receita
          </Link>
        </div>

        <div className="summary-cards">
          <div className="summary-card received">
            <h3>Receitas Recebidas</h3>
            <p className="amount">R$ {totalRecebido.toFixed(2)}</p>
            <div className="icon up-arrow">↑</div>
          </div>
          <div className="summary-card spent">
            <h3>Despesas Totais</h3>
            <p className="amount">R$ {totalGasto.toFixed(2)}</p>
            <div className="icon down-arrow">↓</div>
          </div>
          <div className="summary-card total">
            <h3>Saldo do Mês</h3>
            <p className="amount">R$ {(totalRecebido - totalGasto).toFixed(2)}</p>
            <div className="icon balance">⚖</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
