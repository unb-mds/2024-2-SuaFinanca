"use client";


import { useState, useEffect } from "react";

import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import "./despesas.css";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

const months = [

  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"

];

export default function Despesas() {
  const { isAuthenticated } = useAuth();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [despesas, setDespesas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchDespesas = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=100`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar despesas: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || !data.recent || !Array.isArray(data.recent.transaction)) {
          throw new Error("Resposta inválida da API");
        }

        const despesasFiltradas = data.recent.transaction.filter(
          (item: any) => item.type === "EXPENSE" &&
                         new Date(item.date).getMonth() === currentMonthIndex
        );

        setDespesas(despesasFiltradas);

        const total = despesasFiltradas.reduce((sum: number, d: any) => sum + d.amount, 0);
        setTotalDespesas(total);
      } catch (error) {
        console.error("Erro ao carregar despesas:", error);
      }
    };

    fetchDespesas();
  }, [currentMonthIndex, token, isAuthenticated, BASE_URL]);

  const previousMonth = () => setCurrentMonthIndex(prev => (prev > 0 ? prev - 1 : months.length - 1));
  const nextMonth = () => setCurrentMonthIndex(prev => (prev < months.length - 1 ? prev + 1 : 0));

  useEffect(() => {
    document.body.classList.remove("receitas-page");
    document.body.classList.add("despesas-page");

    return () => document.body.classList.remove("despesas-page");
  }, []);


  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar as despesas</p>
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
            <h1 className="page-title">Despesas</h1>
          </div>

          <div className="month-selector">
            <button onClick={previousMonth} className="month-nav-button"><FaArrowLeft /></button>
            <span className="current-month">{months[currentMonthIndex]}</span>
            <button onClick={nextMonth} className="month-nav-button"><FaArrowRight /></button>
          </div>

          <div className="table-container">
            <h2>Despesas</h2>
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
                {despesas.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: "center" }}>Nenhuma despesa encontrada</td></tr>
                ) : (
                  despesas.map((despesa: any, index: number) => (
                    <tr key={index}>
                      <td>{new Date(despesa.date).toLocaleDateString()}</td>
                      <td>{despesa.categoryName || "Sem categoria"}</td>
                      <td>{despesa.description || "Sem descrição"}</td>
                      <td>R$ {despesa.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Link href="/despesas/nova" className="new-button">
            <FaPlus /> Nova Despesa
          </Link>
        </div>

        <div className="summary-cards">
          <div className="summary-card total">
            <h3>Total de Despesas</h3>
            <p className="amount">R$ {totalDespesas.toFixed(2)}</p>
            <div className="icon balance">⚖</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
