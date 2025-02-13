"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import "./nova-despesa.css"
import Dashboard from "../../dashboard/page"
import { useAuth } from "../../contexts/AuthContext"

export default function NovaDespesa() {
  const { isAuthenticated } = useAuth()
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  const BASE_URL = "http://localhost:8000"

  const [valor, setValor] = useState("0.00")
  const [descricao, setDescricao] = useState("")
  const [conta, setConta] = useState("")
  const [situacao, setSituacao] = useState("")
  const [dataPagamento, setDataPagamento] = useState("HOJE")
  const [dataPersonalizada, setDataPersonalizada] = useState(new Date().toISOString().split("T")[0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !token) {
      alert("Usuário não autenticado! Faça login para continuar.")
      return
    }

    // Definir a data correta com base na seleção do usuário
    let formattedDate = new Date().toISOString().split("T")[0]
    if (dataPagamento === "ONTEM") {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      formattedDate = yesterday.toISOString().split("T")[0]
    } else if (dataPagamento === "OUTROS") {
      formattedDate = dataPersonalizada
    }

    const payload = {
      type: "EXPENSE",
      amount: parseFloat(valor),
      categoryName: descricao,
      date: formattedDate
    }

    try {
      const response = await fetch(`${BASE_URL}/transaction`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Erro ao criar despesa: ${errorData.message || response.statusText}`)
      }

      alert("Despesa criada com sucesso!")
    } catch (error) {
      console.error("Erro ao criar despesa:", error)
      alert("Erro ao criar despesa. Tente novamente.")
    }
  }

  return (
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

            {/* Se o usuário selecionar "OUTROS", exibe o campo de data */}
            {dataPagamento === "OUTROS" && (
              <div className="input-field">
                <input
                  type="date"
                  value={dataPersonalizada}
                  onChange={(e) => setDataPersonalizada(e.target.value)}
                />
              </div>
            )}

            <div className="input-field">
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Categoria da despesa"
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
              <button type="submit" className="primary-button danger">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
