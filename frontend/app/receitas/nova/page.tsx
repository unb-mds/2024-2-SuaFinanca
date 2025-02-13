"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import "./nova-receita.css"
import { useAuth } from "../../contexts/AuthContext"

export default function NovaReceita() {
  const { isAuthenticated } = useAuth()
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  const BASE_URL = "http://localhost:8000"

  const [valor, setValor] = useState("0.00")
  const [descricao, setDescricao] = useState("")
  const [dataPagamento, setDataPagamento] = useState("2025-01-01")

  // Carrega a última transação para sugerir uma categoria válida
  useEffect(() => {
    if (!token || !isAuthenticated) return

    const fetchTransaction = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=1`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar transação: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.length > 0) {
          const lastTransaction = data[0] 
          setValor(lastTransaction.amount.toString())
          setDescricao(lastTransaction.categoryName) // Preenche com uma categoria válida
          setDataPagamento(lastTransaction.date)
        }
      } catch (error) {
        console.error("Erro ao carregar transação:", error)
      }
    }

    fetchTransaction()
  }, [token, isAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !token) {
      alert("Usuário não autenticado! Faça login para continuar.")
      return
    }

    const payload = {
      type: "INCOME",
      amount: parseFloat(valor),
      categoryName: descricao,
      date: dataPagamento
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
        const contentType = response.headers.get("content-type")
        let errorMessage = "Erro desconhecido"

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          errorMessage = errorData.message || response.statusText
        } else {
          errorMessage = await response.text() // Captura mensagens de erro em texto simples
        }

        throw new Error(`Erro ao criar receita: ${errorMessage}`)
      }

      alert("Receita criada com sucesso!")
    } catch (error) {
      console.error("Erro ao criar receita:", error)
      alert(`Erro ao criar receita: ${error.message}`)
    }
  }

  return (
      <div className="new-transaction-container">
        <div className="new-transaction-card">
          <div className="header-section">
            <Link href="/receitas" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1>Nova Receita</h1>
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

            <div className="input-field">
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Categoria"
              />
            </div>

            <div className="date-selector">
              <input
                type="date"
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Salvar Receita
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
