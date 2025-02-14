"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaPlus, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import "./metas.css";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

const months = [

  "Janeiro ", "Fevereiro ", "Março ", "Abril ", "Maio ", "Junho ",
  "Julho ", "Agosto ", "Setembro ", "Outubro ", "Novembro ", "Dezembro "

];

export default function Metas() {
  const { isAuthenticated } = useAuth();
  const [goals, ] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchSaldo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=100`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar saldo: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.recent || !Array.isArray(data.recent.transaction)) {
          throw new Error("Resposta inválida da API: estrutura inesperada");
        }

        const transacoes = data.recent.transaction;
        const saldoCalculado = transacoes.reduce((total, t) => {
          return t.type === "INCOME" ? total + t.amount : total - t.amount;
        }, 0);

        setSaldoTotal(saldoCalculado);
      } catch (error) {
        console.error("Erro ao carregar saldo:", error);
      }
    };

    fetchSaldo();
  }, [token, isAuthenticated]);

  const currentMonthIndex = new Date().getMonth();
  const [currentMonth, setCurrentMonthIndex] = useState(currentMonthIndex);

  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : months.length - 1));
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex < months.length - 1 ? prevIndex + 1 : 0));
  };

  const handleNewGoal = () => {
    alert("Funcionalidade de nova meta ainda não implementada.");

  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar as metas</p>
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
            <h1 className="page-title">Metas</h1>
          </div>

          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button">
              <FaArrowLeft />
            </button>
            <span className="current-month">{months[currentMonth]}</span>
            <button onClick={nextMonth} className="month-nav-button">
              <FaArrowRight />
            </button>
          </div>

          <div className="goals-grid">
            <button className="new-goal-card" onClick={handleNewGoal}>
              <div className="new-goal-content">
                <FaPlus className="plus-icon" />
                <span>Nova Meta</span>
              </div>
            </button>
            {goals.map((goal) => (
              <div key={goal.id} className="goal-card">
                <p>{goal.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card current-balance">
            <h3>Saldo Atual</h3>
            <p className="amount">R$ {saldoTotal.toFixed(2)}</p>
            <div className="icon">
              <FaDollarSign />
            </div>
          </div>
          <div className="summary-card">
            <h3>Metas Concluídas</h3>
            <p className="amount">0</p>
            <div className="icon">
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
