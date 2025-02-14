"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import "./transacoes.css";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

const months = [
  "Janeiro ",
  "Fevereiro ",
  "Março ",
  "Abril ",
  "Maio ",
  "Junho ",
  "Julho ",
  "Agosto ",
  "Setembro ",
  "Outubro ",
  "Novembro ",
  "Dezembro ",
];

interface Transaction {
  id: number;
  date: string;
  description: string;
  account: string;
  value: number;
  status: string;
}

export default function Transacoes() {
  const { isAuthenticated } = useAuth();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(months.length - 1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : months.length - 1,
    );
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex < months.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const handleNewTransaction = () => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: prevTransactions.length + 1,
        date: "2024-06-15",
        description: "Nova Transação",
        account: "Conta Corrente",
        value: 100.0,
        status: "Pendente",
      },
    ]);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar as transações</p>
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
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{months[currentMonthIndex]}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>

          <button
            className="new-transaction-button"
            onClick={handleNewTransaction}
          >
            Adicionar Transação
          </button>

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
                  <tr key={transaction.id}>
                    <td>{transaction.status}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.account}</td>
                    <td>R$ {transaction.value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card balance">
            <h3>Saldo Atual</h3>
            <p className="amount">
              R${" "}
              {transactions
                .reduce((sum, transaction) => sum + transaction.value, 0)
                .toFixed(2)}
            </p>
            <div className="icon">
              <FaWallet />
            </div>
          </div>
          <div className="summary-card income">
            <h3>Receitas</h3>
            <p className="amount">
              R${" "}
              {transactions
                .filter((t) => t.value > 0)
                .reduce((sum, transaction) => sum + transaction.value, 0)
                .toFixed(2)}
            </p>
            <div className="icon">
              <FaArrowUp />
            </div>
          </div>
          <div className="summary-card expenses">
            <h3>Despesas</h3>
            <p className="amount">
              R${" "}
              {transactions
                .filter((t) => t.value < 0)
                .reduce((sum, transaction) => sum + transaction.value, 0)
                .toFixed(2)}
            </p>
            <div className="icon">
              <FaArrowDown />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
