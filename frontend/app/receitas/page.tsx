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
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";


  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth())
  const [receitas, setReceitas] = useState([])
  const [despesas, setDespesas] = useState([])
  const [totalRecebido, setTotalRecebido] = useState(0)
  const [totalGasto, setTotalGasto] = useState(0)

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
          throw new Error("Estrutura da API inesperada")
        }

        // Filtra transações por mês
        const receitasFiltradas = data.recent.transaction.filter(
          (item: any) => item.type === "INCOME" &&
                         new Date(item.date).getMonth() === currentMonthIndex
        )

        const despesasFiltradas = data.recent.transaction.filter(
          (item: any) => item.type === "EXPENSE" &&
                         new Date(item.date).getMonth() === currentMonthIndex
        )

        setReceitas(receitasFiltradas)
        setDespesas(despesasFiltradas)

        // Calcula os totais
        const totalReceitas = receitasFiltradas.reduce((sum: number, r: any) => sum + r.amount, 0)
        const totalDespesas = despesasFiltradas.reduce((sum: number, d: any) => sum + d.amount, 0)

        setTotalRecebido(totalReceitas)
        setTotalGasto(totalDespesas)

      } catch (error) {
        console.error("Erro ao carregar transações:", error)
      }
    }

    fetchTransacoes()
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
            <h2>Receitas</h2>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição (Categoria)</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {receitas.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>Nenhuma receita encontrada</td>
                  </tr>
                ) : (
                  receitas.map((receita: any, index: number) => (
                    <tr key={index}>
                      <td>{new Date(receita.date).toLocaleDateString()}</td>
                      <td>{receita.categoryName || "Sem categoria"}</td>
                      <td>R$ {receita.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
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
