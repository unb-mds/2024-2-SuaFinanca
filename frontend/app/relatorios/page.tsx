"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./relatorios.css";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Relatorios() {
  const { isAuthenticated } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://default-url.com";

  const [dadosPorMes, setDadosPorMes] = useState({ receitas: {}, despesas: {} });

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchTransacoes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/transaction/recent?limit=200`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar transações: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || !data.recent || !Array.isArray(data.recent.transaction)) {
          throw new Error("Resposta inválida da API: estrutura inesperada");
        }

        processarDados(data.recent.transaction);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };

    fetchTransacoes();
  }, [token, isAuthenticated, BASE_URL]);

  const processarDados = (transacoes) => {
    const receitasPorMes = {};
    const despesasPorMes = {};

    transacoes.forEach((t) => {
      const mes = t.date.slice(0, 7); // Formato YYYY-MM

      if (t.type === "INCOME") {
        receitasPorMes[mes] = (receitasPorMes[mes] || 0) + t.amount;
      } else if (t.type === "EXPENSE") {
        despesasPorMes[mes] = (despesasPorMes[mes] || 0) + t.amount;
      }
    });


    setDadosPorMes({ receitas: receitasPorMes, despesas: despesasPorMes });
  };

  const criarDadosGrafico = (dados) => ({
    labels: Object.keys(dados), // Cada mês será um rótulo
    datasets: [
      {
        data: Object.values(dados), // Cada fatia será o total daquele mês
        backgroundColor: ["#00CFFF", "#4CAF50", "#FF9900", "#6666FF", "#FFE600", "#FF0000"],
        borderWidth: 1,
      },
    ],

  });

  const handleDownloadAll = () => {
    alert("Download de relatórios ainda não implementado.");

  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="login-prompt">
          <p>Faça login para acessar os relatórios</p>
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
            <h1 className="page-title">Relatórios</h1>
          </div>

          <div className="charts-container">
            <div className="summary-charts">
              <div className="chart-card">
                <h3>Receitas por mês</h3>
                {Object.keys(dadosPorMes.receitas).length > 0 ? (
                  <Pie data={criarDadosGrafico(dadosPorMes.receitas)} />
                ) : (
                  <p>Sem dados disponíveis</p>
                )}
              </div>
              <div className="chart-card">
                <h3>Despesas por mês</h3>
                {Object.keys(dadosPorMes.despesas).length > 0 ? (
                  <Pie data={criarDadosGrafico(dadosPorMes.despesas)} />
                ) : (
                  <p>Sem dados disponíveis</p>
                )}
              </div>
            </div>

            <button className="download-button" onClick={handleDownloadAll}>
              <FaDownload /> Baixar todos
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
