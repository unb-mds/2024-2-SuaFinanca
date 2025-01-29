"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaPlus, FaDollarSign, FaWallet } from "react-icons/fa"
import "./saldo.css"

export default function Contas() {
  const [accounts, setAccounts] = useState([])

  const handleNewAccount = () => {
    // Add new account logic here
  }

  return (
    <div className="page-container">
      <div className="content-area">
        <div className="header-section">
          <Link href="/dashboard" className="back-button">
            <FaArrowLeft />
          </Link>
          <h1 className="page-title">Contas</h1>
        </div>

        <div className="accounts-grid">
          <button className="new-account-card" onClick={handleNewAccount}>
            <div className="new-account-content">
              <FaPlus className="plus-icon" />
              <span>Nova Conta</span>
            </div>
          </button>
          {accounts.map((account) => (
            // Account cards will be rendered here
            <div key={account.id} className="account-card">
              {/* Account details */}
            </div>
          ))}
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card current-balance">
          <h3>Saldo Atual</h3>
          <p className="amount">R$ 0,00</p>
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
  )
}

