"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import "./nova-despesa.css"
import Dashboard from "../../dashboard/page"

export default function NovaDespesa() {
  const [valor, setValor] = useState("0.00")
  const [descricao, setDescricao] = useState("")
  const [conta, setConta] = useState("")
  const [situacao, setSituacao] = useState("")
  const [dataPagamento, setDataPagamento] = useState("HOJE")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add submission logic here
  }

  return (
    <Dashboard>
      <div className="new-transaction-container">
        <div className="new-transaction-card">
          <div className="header-section">
            <Link href="/despesas" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1>Nova Despesa</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="value-input">
              <span className="currency">R$</span>
              <input
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="date-selector">
              <button
                type="button"
                className={dataPagamento === "HOJE" ? "active" : ""}
                onClick={() => setDataPagamento("HOJE")}
              >
                HOJE
              </button>
              <button
                type="button"
                className={dataPagamento === "ONTEM" ? "active" : ""}
                onClick={() => setDataPagamento("ONTEM")}
              >
                ONTEM
              </button>
              <button
                type="button"
                className={dataPagamento === "OUTROS" ? "active" : ""}
                onClick={() => setDataPagamento("OUTROS")}
              >
                OUTROS
              </button>
            </div>

            <div className="input-field">
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição"
              />
            </div>

            <div className="input-field">
              <input type="text" value={conta} onChange={(e) => setConta(e.target.value)} placeholder="Conta" />
            </div>

            <div className="input-field">
              <input
                type="text"
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
                placeholder="Situação"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-button">
                Salvar e criar conta
              </button>
              <button type="submit" className="primary-button danger">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  )
}

