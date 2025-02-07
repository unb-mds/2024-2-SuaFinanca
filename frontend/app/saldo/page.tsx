"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaPlus, FaDollarSign, FaWallet } from "react-icons/fa"
import "./saldo.css"
import Layout from "../components/Layout"
import { useAuth } from "../contexts/AuthContext"

export default function Contas() {
  const { isAuthenticated } = useAuth()
  const [accounts, setAccounts] = useState([])

  const handleNewAccount = () => {
    // Add new account logic here
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar o saldo</p>
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
            <h1 className="page-title">Saldo</h1>
          </div>

          <div className="accounts-grid">
            <button className="new-account-card" onClick={handleNewAccount}>
              <div className="new-account-content">
                <FaPlus className="plus-icon" />
                <span>Novo saldo</span>
              </div>
            </button>
            {accounts.map((account) => (
              <div key={account.id} className="account-card">
                <h3>{account.name}</h3>
                <p className="balance">R$ {account.balance.toFixed(2)}</p>
                <p className="account-type">{account.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card current-balance">
            <h3>Saldo Atual</h3>
            <p className="amount">R$ {accounts.reduce((sum, account) => sum + account.balance, 0).toFixed(2)}</p>
            <div className="icon">
              <FaDollarSign />
            </div>
          </div>
          <div className="summary-card expected-balance">
            <h3>Saldo Previsto</h3>
            <p className="amount">R$ 0,00</p>
            <div className="icon">
              <FaWallet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

