"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight, FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa"
import "./transacoes.css"

const months = [
    "Janeiro ", "Fevereiro ", "Março ", "Abril ", "Maio ", "Junho ",
    "Julho ", "Agosto ", "Setembro ", "Outubro ", "Novembro ", "Dezembro " 
  ]

export default function Transacoes() {
  const [transactions, setTransactions] = useState([])

  const [currentMonthIndex, setCurrentMonthIndex] = useState(months.length - 1)

  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : months.length - 1))
  }

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex < months.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <div className="page-container">
      <div className="content-area">
        <div className="header-section">
          <Link href="/dashboard" className="back-button">
            <FaArrowLeft />
          </Link>
          <h1 className="page-title">Transações</h1>
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
            <tbody>
              {transactions.map((transaction) => (
                // Transaction rows will be rendered here
                <tr key={transaction.id}>{/* Transaction details */}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card balance">
          <h3>Saldo Atual</h3>
          <p className="amount">R$ 0,00</p>
          <div className="icon">
            <FaWallet />
          </div>
        </div>
        <div className="summary-card income">
          <h3>Receitas</h3>
          <p className="amount">R$ 0,00</p>
          <div className="icon">
            <FaArrowUp />
          </div>
        </div>
        <div className="summary-card expenses">
          <h3>Despesas</h3>
          <p className="amount">R$ 0,00</p>
          <div className="icon">
            <FaArrowDown />
          </div>
        </div>
      </div>
    </div>
  )
}

