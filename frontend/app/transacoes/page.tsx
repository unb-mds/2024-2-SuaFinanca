"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./transacoes.css";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Transacoes() {
  const { isAuthenticated } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [transactions, setTransactions] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [saldoMensal, setSaldoMensal] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchTransacoes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=100`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar transações: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.recent || !Array.isArray(data.recent.transaction)) {
          throw new Error("Resposta inválida da API: estrutura inesperada");
        }

        const transacoes = data.recent.transaction;

        const transacoesMes = transacoes.filter(
          (item) => new Date(item.date).getMonth() === currentMonthIndex
        );

        setTransactions(transacoesMes);

        const receitas = transacoesMes.filter((item) => item.type === "INCOME");
        const despesas = transacoesMes.filter((item) => item.type === "EXPENSE");

        const totalReceitas = receitas.reduce((sum, r) => sum + r.amount, 0);
        const totalDespesas = despesas.reduce((sum, d) => sum + d.amount, 0);
        const saldo = totalReceitas - totalDespesas;

        setTotalReceitas(totalReceitas);
        setTotalDespesas(totalDespesas);
        setSaldoMensal(saldo);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };

    fetchTransacoes();
  }, [currentMonthIndex, token, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar as Transações</p>
          <Link href="/dashboard">
            <button>Voltar para o Dashboard</button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="content-area">
          <div className="header-section">
            <Link href="/dashboard" className="back-button">
              <FaArrowLeft />
            </Link>
            <h1 className="page-title">Transações</h1>
          </div>

          <div className="month-selector">
            <button onClick={() => setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : months.length - 1))} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{months[currentMonthIndex]}</span>
            <button onClick={() => setCurrentMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : 0))} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>Nenhuma transação encontrada</td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>{transaction.categoryName || "Sem categoria"}</td>
                      <td>{transaction.description || "Sem descrição"}</td>
                      <td className={transaction.type === "INCOME" ? "income" : "expense"}>
                        R$ {transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="summary-cards">
          <div className={`summary-card balance ${saldoMensal >= 0 ? "positive-balance" : "negative-balance"}`}>
            <h3>Saldo do mês</h3>
            <p className="amount">R$ {saldoMensal.toFixed(2)}</p>
            <div className="icon">
              <FaWallet />
            </div>
          </div>
          <div className="summary-card income">
            <h3>Receitas do mês</h3>
            <p className="amount">R$ {totalReceitas.toFixed(2)}</p>
            <div className="icon">
              <FaArrowUp />
            </div>
          </div>
          <div className="summary-card expenses">
            <h3>Despesas do mês</h3>
            <p className="amount">R$ {totalDespesas.toFixed(2)}</p>
            <div className="icon">
              <FaArrowDown />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}